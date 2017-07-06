import * as crypto from "crypto";

export function getSHA256base64(body: string): string {
    const hash = crypto.createHash("sha256");
    hash.update(body);
    return hash.digest("base64");

}