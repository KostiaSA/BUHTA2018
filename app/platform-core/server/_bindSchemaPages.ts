import * as express from "express";
import {_config} from "../../../_config";
import {_getAllFilesFromDirectory} from "../utils/_getAllFilesFromDirectory";
import {schemaObjectModel} from "../schema/_schemaObjectModel";
import {ISchemaPageProps} from "../schema/ISchemaPage";
import {_createIndexHtml} from "./_createIndexHtml";
import {SchemaPage} from "../schema/SchemaPage";
let path = require("path");

export async function _bindSchemaPages(expressApp: any) {


    let instance = await schemaObjectModel.findAll({where: {className: SchemaPage.classInfo.className}});

    for (let item of instance) {
        let page = JSON.parse(item.get().jsonData) as ISchemaPageProps;
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
