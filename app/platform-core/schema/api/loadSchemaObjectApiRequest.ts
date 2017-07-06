
import {isString} from "util"; 

import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code
export interface ILoadSchemaObjectApiRequest {
    id: string
}

export interface ILoadSchemaObjectApiResponse {
    object: ISchemaObjectProps;
    error?: string;
}


export function loadSchemaObjectApiRequest(req: ILoadSchemaObjectApiRequest): Promise<ILoadSchemaObjectApiResponse> {
    return new Promise<ILoadSchemaObjectApiResponse>(
        (resolve: (obj: ILoadSchemaObjectApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/api/loadSchemaObjectApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = JSON.parse((this as XMLHttpRequest).responseText) as ILoadSchemaObjectApiResponse;
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
