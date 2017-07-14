export function arrayExchangeItems(list: any[], index1: number, index2: number) {
    let b = list[index2];
    list[index2] = list[index1];
    list[index1] = b;
}