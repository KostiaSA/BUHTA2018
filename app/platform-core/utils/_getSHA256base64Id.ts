import * as crypto from "crypto";
import {replaceAll} from "./replaceAll";

export function _getSHA256base64Id(body: string): string {
    const hash = crypto.createHash("sha256");
    hash.update(body);

    return replaceAll(replaceAll(hash.digest("base64"), "/", ""), "+", "").substr(0, 20);

}