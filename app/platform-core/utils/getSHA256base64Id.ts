var SHA256 = require("crypto-js/sha256");
import {replaceAll} from "./replaceAll";
import {getRandomString} from "./getRandomString";

export function getSHA256base64Id(body: string): string {
    const hash = SHA256(body);
    return replaceAll(replaceAll(btoa(hash), "/", ""), "+", "").substr(0, 20);
}

(window as any).getRandomId=():string=>{return getSHA256base64Id(getRandomString())};