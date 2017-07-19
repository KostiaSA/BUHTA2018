
import {_loadSchemaObject} from "../../../server/schema/_SchemaObject";
import {_SchemaTable} from "../../../server/schema/table/_SchemaTable";

export interface _ITableGetRowApiRequest {
    tableId: string;
    recordId: any;
}

export interface _ITableGetRowApiResponse {
    row: any;
    error?: string;
}

export async function _tableGetRowApiResponse(req: _ITableGetRowApiRequest): Promise<_ITableGetRowApiResponse> {
    try {
        let table = await _loadSchemaObject<_SchemaTable>(req.tableId);
        let row = await table.getRow(req.recordId);
        return Promise.resolve({row: row})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _tableGetRowApiResponse: " + e.toString()} as any);
    }
}

