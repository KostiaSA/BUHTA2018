import {readdir} from "fs";
import {replaceAll} from "./replaceAll";
let recursive = require("recursive-readdir");

export async function _getAllFilesFromDirectory(path: string, ignore?: string[]): Promise<string[]> {
    let ret: string[] = await recursive(path, ignore);
    return ret.map((item: string) => replaceAll(item, "\\", "/"));
}