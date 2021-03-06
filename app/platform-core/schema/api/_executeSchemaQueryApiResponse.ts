
import {_loadSchemaObject} from "../../server/schema/_loadSchemaObject";
import {_SchemaQuery} from "../../server/schema/query/_SchemaQuery";

export interface _IExecuteSchemaQueryApiRequest {
    queryId: string;
    dbId: string;
}

export interface _IExecuteSchemaQueryApiResponse {
    rows: any[];
    error?: string;
}

export async function _executeSchemaQueryApiResponse(req: _IExecuteSchemaQueryApiRequest): Promise<_IExecuteSchemaQueryApiResponse> {
    try {
        let query = await _loadSchemaObject<_SchemaQuery>(req.queryId);
        let rows = await query.execute(req.dbId);
        return Promise.resolve({rows: rows})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _executeSchemaQueryApiResponse: " + e.toString()} as any);
    }
}