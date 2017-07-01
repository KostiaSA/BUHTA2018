
import {isString} from "util";

import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code
export interface ISaveSchemaObjectApiRequest {
    object: ISchemaObjectProps;
}

export interface ISaveSchemaObjectApiResponse {
    error?: string;
}


export function saveSchemaObjectApiRequest(req: ISaveSchemaObjectApiRequest): Promise<ISaveSchemaObjectApiResponse> {
    return new Promise<ISaveSchemaObjectApiResponse>(
        (resolve: (obj: ISaveSchemaObjectApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/api/saveSchemaObjectApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = JSON.parse((this as XMLHttpRequest).responseText) as ISaveSchemaObjectApiResponse;
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
