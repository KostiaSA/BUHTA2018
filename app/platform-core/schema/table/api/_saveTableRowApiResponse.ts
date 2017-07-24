
import {_loadSchemaObject} from "../../../server/schema/_loadSchemaObject";
import {_SchemaTable} from "../../../server/schema/table/_SchemaTable";
import {_SchemaDatabase} from "../../../server/schema/database/_SchemaDatabase";

export interface _ISaveTableRowApiRequest {
    dbId: string;
    tableId: string;
    row: any;
}

export interface _ISaveTableRowApiResponse {
    error?: string;
}

export async function _saveTableRowApiResponse(req: _ISaveTableRowApiRequest): Promise<_ISaveTableRowApiResponse> {
    try {
        let db=  await _loadSchemaObject<_SchemaDatabase>(req.dbId);
        let table = await _loadSchemaObject<_SchemaTable>(req.tableId);

        let row = await db.upsertTableRow(await table.getSqlTable(), req.row);
        return Promise.resolve({})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка сохранения tableRow: " + e.toString()});
    }
    // try {
    //     let table=await _loadSchemaObject<_SchemaTable>(req.tableId);
    //     let model= await table.getSequelizeModel();
    //     await model.upsert(req.row)
    //     return Promise.resolve({})
    // }
    // catch (e) {
    //     return Promise.resolve({error: "Ошибка сохранения tableRow: " + e.toString()});
    // }

}