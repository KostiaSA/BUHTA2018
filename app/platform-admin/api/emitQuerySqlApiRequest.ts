
import {isString} from "util"; 
import {parse} from "ejson";

import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps"; // emit-to-request-code
import {SqlDialect} from "../../platform-core/schema/table/datatypes/SqlDataType";// emit-to-request-code
export interface IEmitQuerySqlApiRequest {
    queryProps: ISchemaQueryProps;
    dialect: SqlDialect;
}

export interface IEmitQuerySqlApiResponse {
    sql: string;
    error?: string;
}


export function emitQuerySqlApiRequest(req: IEmitQuerySqlApiRequest): Promise<IEmitQuerySqlApiResponse> {
    return new Promise<IEmitQuerySqlApiResponse>(
        (resolve: (obj: IEmitQuerySqlApiResponse) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "/api/platform-admin/api/emitQuerySqlApiResponse";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                let responseText = (this as XMLHttpRequest).responseText;
                if (isString(responseText) && !responseText.startsWith("{"))
                    reject("call api error ("+url+"):" + responseText);
                else {
                    //console.log((this as any).responseText);
                    let ansBody = parse((this as XMLHttpRequest).responseText) as IEmitQuerySqlApiResponse;
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
