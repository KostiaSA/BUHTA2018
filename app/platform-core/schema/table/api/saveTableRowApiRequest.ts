
import {isString} from "util"; 
import {parse} from "ejson";

export interface ISaveTableRowApiRequest {
    tableId: string;
    row: any;
}

export interface ISaveTableRowApiResponse {
    error?: string;
}


export function saveTableRowApiRequest(req: ISaveTableRowApiRequest): Promise<ISaveTableRowApiResponse> {
    return new Promise<ISaveTableRowApiResponse>(
        (resolve: (obj: ISaveTableRowApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-core/schema/table/api/saveTableRowApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as ISaveTableRowApiResponse;
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
