import * as express from "express";
import {_config} from "../../../_config";
import {_getAllFilesFromDirectory} from "../utils/_getAllFilesFromDirectory";
let path = require("path");

export async function _bindApi(expressApp:any) {

    let files = await _getAllFilesFromDirectory(_config.projectRootPath, ["!_*ApiResponse.js"]);

    for (let file of files) {
        let apiPath = "/"+file.replace(_config.projectRootPath + "/app", "api").replace(/\.[^/.]+$/, "").replace("_","");
        console.log("bind API: "+apiPath);
        let module = require(file);
        let responseFuncName=path.basename(file).replace(/\.[^/.]+$/, "");

        expressApp.post(apiPath, (req: express.Request, res: express.Response, next: Function) => {
            console.log("POST: "+apiPath, req.body);

            module[responseFuncName](req.body).then((result: any) => {
                res.send(result);
            });

        });

    }

    //console.log(files);
}
