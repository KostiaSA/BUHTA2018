
import {isString} from "util"; 
import {parse} from "ejson";

export interface IExecuteSchemaQueryApiRequest {
    queryId: string;
    dbId: string;
}

export interface IExecuteSchemaQueryApiResponse {
    rows: any[];
    error?: string;
}


export function executeSchemaQueryApiRequest(req: IExecuteSchemaQueryApiRequest): Promise<IExecuteSchemaQueryApiResponse> {
    return new Promise<IExecuteSchemaQueryApiResponse>(
        (resolve: (obj: IExecuteSchemaQueryApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/api/executeSchemaQueryApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as IExecuteSchemaQueryApiResponse;
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
