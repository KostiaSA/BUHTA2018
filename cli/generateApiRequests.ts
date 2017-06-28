import {_getAllFilesFromDirectory} from "../app/platform-core/utils/_getAllFilesFromDirectory";
import {_config} from "../_config";
import {readFileSync, writeFileSync} from "fs";
import {replaceAll} from "../app/platform-core/utils/replaceAll";
let path = require("path");

async function generateRequestFile() {

    let files = await _getAllFilesFromDirectory(_config.projectRootPath, ["!_*ApiResponse.ts*"]);

    for (let responseFile of files) {
        let apiPath = "/" + responseFile.replace(_config.projectRootPath + "/app", "api").replace(/\.[^/.]+$/, "").replace("_", "");
        //console.log(apiPath);

        let responseCode = readFileSync(responseFile).toString();
        let apiInterfaces: string[] = [];

        //console.log("=========",responseCode, replaceAll(responseCode, "\r", "").split("\n"));


        let mode = 0;
        let reguestInterfaceName = "";
        let responseInterfaceName = "";
        for (let line of replaceAll(responseCode, "++++++++++", "").split("\n")) {
            //console.log("===LINE===", line);
            if (line.indexOf("export interface") > -1) {
                mode = 1;
                if (line.indexOf("ApiRequest") > -1) {
                    reguestInterfaceName = line.replace("export interface", "").replace("{", "").replace("_", "").trim();
                    apiInterfaces.push("export interface " + reguestInterfaceName + " {");
                }
                else if (line.indexOf("ApiResponse") > -1) {
                    responseInterfaceName = line.replace("export interface", "").replace("{", "").replace("_", "").trim();
                    apiInterfaces.push("export interface " + responseInterfaceName + " {");
                }
                else
                    throw "ошибка в " + responseFile + ": " + line;
            }
            else if (mode > 0 && line.indexOf("export function") > -1) {
                break;
            }
            else if (mode > 0 || line.indexOf("emit-to-request-code")>-1) {
                apiInterfaces.push(line);
            }
        }
        if (reguestInterfaceName === "")
            throw "ошибка в " + responseFile + ": не найден Request интерфейс";

        if (responseInterfaceName === "")
            throw "ошибка в " + responseFile + ": не найден Response интерфейс";

        //console.log("=========", apiInterfaces);

        let requestFuncName = path.basename(responseFile).replace(/\.[^/.]+$/, "").replace("_", "").replace("ApiResponse", "ApiRequest");
        let requestFile = path.join(path.dirname(responseFile), requestFuncName + ".ts");

        console.log(requestFuncName, requestFile);

        let requestCode = `
import {isString} from "util"; 

${apiInterfaces.join("\n")}

export function ${requestFuncName}(req: ${reguestInterfaceName}): Promise<${responseInterfaceName}> {
    return new Promise<${responseInterfaceName}>(
        (resolve: (obj: ${responseInterfaceName}) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "${apiPath}";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = JSON.parse((this as XMLHttpRequest).responseText) as ${responseInterfaceName};
                    if (ansBody.error)
                        reject("call api error ("+url+"):" + ansBody.error);
                    else {
                        resolve(ansBody);
                    }
                }
            };

            xhr.onerror = function (ev: Event) {
                reject("нет связи с сервером");
            };

            xhr.send(JSON.stringify(req));

        });

}        
`;

        writeFileSync(requestFile, requestCode);
    }

    //console.log(files);
}

generateRequestFile()
    .then(() => {
        console.log("генерация завершена");
        process.exit(0);
    })
    .catch((err: any) => {
        console.error(err);
        process.exit(1);
    })
;