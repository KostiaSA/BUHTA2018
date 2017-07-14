
import {isString} from "util"; 
import {parse} from "ejson";

export interface ISuperPingApiRequest {
    super_login: string; // это логин
}

export interface ISuperPingApiResponse {
    str: string;
    error?: string;
}


export function superPingApiRequest(req: ISuperPingApiRequest): Promise<ISuperPingApiResponse> {
    return new Promise<ISuperPingApiResponse>(
        (resolve: (obj: ISuperPingApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/rest-api/superPingApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as ISuperPingApiResponse;
                    if (ansBody.error)
                        reject("call api error ("+url+"):" + ansBody.error);
                    else {
                        resolve(ansBody);
                    }
                }
            };

            xhr.onerror = function (ev: Event) {
                reject("нет связи с сервером");
            };

            xhr.send(JSON.stringify(req));

        });

}        
