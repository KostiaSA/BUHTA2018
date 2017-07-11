import {replaceAll} from "./replaceAll";

export function getClassNameFromJsFileName(jsFileName: string): string {

    let str = replaceAll(jsFileName, "\\", "/");
    str = str.substr(1, str.length - 3);
    return str;

}
