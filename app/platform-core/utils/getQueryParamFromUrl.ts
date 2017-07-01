export function getParamFromUrl(paramName: string): string {
    let url = window.location.href;
    paramName = paramName.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined as any;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
