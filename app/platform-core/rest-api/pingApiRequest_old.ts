
import {isString} from "util";

export interface IPingRequest {
    login: string;
}

export interface IPingAnswer {
    str: string;
    error?: string;
}

export function pingApiRequest(req: IPingRequest): Promise<IPingAnswer> {
    return new Promise<IPingAnswer>(
        (resolve: (obj: IPingAnswer) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "api/platform-core/rest-api/pingApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error (pingApiRequest):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = JSON.parse((this as XMLHttpRequest).responseText) as IPingAnswer;
                    if (ansBody.error)
                        reject("call api error (pingApiRequest):" + ansBody.error);
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
