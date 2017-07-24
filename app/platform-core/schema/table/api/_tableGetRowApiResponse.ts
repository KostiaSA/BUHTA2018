
import {_loadSchemaObject} from "../../../server/schema/_loadSchemaObject";
import {_SchemaTable} from "../../../server/schema/table/_SchemaTable";
import {_SchemaDatabase} from "../../../server/schema/database/_SchemaDatabase";

export interface _ITableGetRowApiRequest {
    dbId: string;
    tableId: string;
    recordId: any;
}

export interface _ITableGetRowApiResponse {
    row: any;
    error?: string;
}

export async function _tableGetRowApiResponse(req: _ITableGetRowApiRequest): Promise<_ITableGetRowApiResponse> {
    try {
        let db=  await _loadSchemaObject<_SchemaDatabase>(req.dbId);
        let table = await _loadSchemaObject<_SchemaTable>(req.tableId);

        let row = await db.selectTableRow(await table.getSqlTable(), req.recordId);
        return Promise.resolve({row: row})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _tableGetRowApiResponse: " + e.toString()} as any);
    }
}

