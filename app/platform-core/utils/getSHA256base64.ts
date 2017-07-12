
const SHA256 = require("crypto-js/sha256");

export function getSHA256base64(body: string): string {
    return btoa(SHA256(body));

}