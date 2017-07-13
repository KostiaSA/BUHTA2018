import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps"; // emit-to-request-code
import {SqlDialect} from "../../platform-core/schema/table/datatypes/SqlDataType";// emit-to-request-code

import {_SchemaQuery} from "../../platform-core/server/schema/query/_SchemaQuery";

export interface _IEmitQuerySqlApiRequest {
    queryProps: ISchemaQueryProps;
    dialect: SqlDialect;
}

export interface _IEmitQuerySqlApiResponse {
    sql: string;
    error?: string;
}

export async function _emitQuerySqlApiResponse(req: _IEmitQuerySqlApiRequest): Promise<_IEmitQuerySqlApiResponse> {
    try {
        let query = new _SchemaQuery(req.queryProps);
        let sql = await query.emitSql(req.dialect);
        return Promise.resolve({sql: sql})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _emitQuerySqlApiResponse: " + e.toString()} as any);
    }
}