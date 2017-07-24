import * as express from "express";
import {_config} from "../../../_config";
import {_getAllFilesFromDirectory} from "../utils/_getAllFilesFromDirectory";

import {ISchemaPageProps} from "../schema/ISchemaPage";
import {_createIndexHtml} from "./_createIndexHtml";
import {SchemaPage} from "../schema/SchemaPage";
import {parse} from "ejson";
import {_getSchemaDatabase} from "./schema/_getSchemaDatabase";
let path = require("path");

export async function _bindSchemaPages(expressApp: any) {


    //let instance = await schemaObjectModel.findAll({where: {className: SchemaPage.classInfo.className}});

    let db=await _getSchemaDatabase();
    let emitter=db.createSqlEmitter();
    let items=await db.executeSqlBatch(["SELECT jsonData FROM __SchemaObject__ WHERE className="+emitter.stringToSql(SchemaPage.classInfo.className)]);

    for (let item of items[0]) {
        let page = parse(item.jsonData) as ISchemaPageProps;
        if (page.url) {
            if (!page.url.startsWith("/"))
                page.url = "/" + page.url;

            console.log("bind SchemaPage " + page.title + ": " + page.url);
            expressApp.get(page.url, (req: express.Request, res: express.Response, next: Function) => {
                console.log("GET: " + page.url, req.body);
                res.send(_createIndexHtml(page.id));
            });

        }
    }

    //console.log(files);
}
