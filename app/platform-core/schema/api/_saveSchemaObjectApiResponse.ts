import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code


import {stringify} from "ejson";
import {_getSchemaObjectTable} from "../../server/schema/_getSchemaObjectTable";
import {_getSchemaDatabase} from "../../server/schema/_getSchemaDatabase";
import {_SqlUpsertTableRowEmitter} from "../../server/sql-emitter/_SqlUpsertTableRowEmitter";

export interface _ISaveSchemaObjectApiRequest {
    object: ISchemaObjectProps;
}

export interface _ISaveSchemaObjectApiResponse {
    error?: string;
}

export async function _saveSchemaObjectApiResponse(req: _ISaveSchemaObjectApiRequest): Promise<_ISaveSchemaObjectApiResponse> {

    let table = await _getSchemaObjectTable();
    let db = await _getSchemaDatabase();


    let row = {
        id: req.object.id,
        name: req.object.name,
        className: req.object.className,
        description: req.object.description,
        jsonData: stringify(req.object)
    };

    try {
        await db.upsertTableRow(table, row);
        return Promise.resolve({})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка сохранения SchemaObject ([" + row.id + "] " + row.name + "): " + e.toString()});
    }


}