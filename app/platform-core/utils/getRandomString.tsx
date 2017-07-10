export function getRandomString(length: number = 20): string {
    // двойная хрень нужна, потому что Safari и iOS для Math.random().toString(36) выдают 10 символов а не 22
    let str = Math.random().toString(36).slice(2, 12);
    str = str + Math.random().toString(36).slice(2, 12);
    return str.slice(0, length);
}