
import {isString} from "util"; 
import {parse} from "ejson";

import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code
import {WhereOptions} from "sequelize";  // emit-to-request-code
export interface IFindSchemaObjectsForLookupApiRequest {
    where: WhereOptions;
}

export interface IFindSchemaObjectsForLookupApiResponse {
    objects: ISchemaObjectProps[];
    error?: string;
}


export function findSchemaObjectsForLookupApiRequest(req: IFindSchemaObjectsForLookupApiRequest): Promise<IFindSchemaObjectsForLookupApiResponse> {
    return new Promise<IFindSchemaObjectsForLookupApiResponse>(
        (resolve: (obj: IFindSchemaObjectsForLookupApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/api/findSchemaObjectsForLookupApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as IFindSchemaObjectsForLookupApiResponse;
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
