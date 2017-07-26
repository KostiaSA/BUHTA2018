import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code

import {parse} from "ejson";
import {_getSchemaObjectTable} from "../../server/schema/_getSchemaObjectTable";
import {_getSchemaDatabase} from "../../server/schema/_getSchemaDatabase";

export interface _IFindSchemaObjectsByClassNameApiRequest {
    classNames: string[];
}

export interface _IFindSchemaObjectsByClassNameApiResponse {
    objects: ISchemaObjectProps[];
    error?: string;
}

export async function _findSchemaObjectsByClassNamesApiResponse(req: _IFindSchemaObjectsByClassNameApiRequest): Promise<_IFindSchemaObjectsByClassNameApiResponse> {

    let table = await _getSchemaObjectTable();
    let db = await _getSchemaDatabase();
    let emitter = db.createSqlEmitter();

    let where: string[] = req.classNames.map((className: string) => {
        return emitter.identifierToSql("className") + "=" + emitter.stringToSql(className)
    });

    let rows = await db.findTableRows(table, where.join(" OR "), ["jsonData"]);

    return {
        objects: rows.map((row) => {
            return parse(row.jsonData) as ISchemaObjectProps
        })
    };

}