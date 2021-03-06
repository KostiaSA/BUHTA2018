
import {isString} from "util"; 
import {parse} from "ejson";

import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code
export interface IFindSchemaObjectsApiRequest {
    where: any;
}

export interface IFindSchemaObjectsApiResponse {
    objects: ISchemaObjectProps[];
    error?: string;
}


export function findSchemaObjectsApiRequest(req: IFindSchemaObjectsApiRequest): Promise<IFindSchemaObjectsApiResponse> {
    return new Promise<IFindSchemaObjectsApiResponse>(
        (resolve: (obj: IFindSchemaObjectsApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/api/findSchemaObjectsApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as IFindSchemaObjectsApiResponse;
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
