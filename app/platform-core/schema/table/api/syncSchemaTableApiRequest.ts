
import {isString} from "util"; 

export interface ISyncSchemaTableApiRequest {
    schemaTableId: string;
}

export interface ISyncSchemaTableApiResponse {
    error?: string;
}


export function syncSchemaTableApiRequest(req: ISyncSchemaTableApiRequest): Promise<ISyncSchemaTableApiResponse> {
    return new Promise<ISyncSchemaTableApiResponse>(
        (resolve: (obj: ISyncSchemaTableApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/table/api/syncSchemaTableApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = JSON.parse((this as XMLHttpRequest).responseText) as ISyncSchemaTableApiResponse;
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
