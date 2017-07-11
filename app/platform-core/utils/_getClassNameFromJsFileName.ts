import {replaceAll} from "./replaceAll";
import {_config} from "../../../_config";

export function _getClassNameFromJsFileName(jsFileName: string): string {

    let str = replaceAll(jsFileName, "\\", "/");
    str=str.replace(_config.projectRootPath + "/app/","");
    str = str.substr(0, str.length - 3);
    return str;

}
