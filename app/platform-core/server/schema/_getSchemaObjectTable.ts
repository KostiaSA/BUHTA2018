import {_ISqlTable} from "./database/_SqlTable";
import {_loadSchemaObject} from "./_loadSchemaObject";
import {CoreConst} from "../../CoreConst";
import {SchemaTable} from "../../schema/table/SchemaTable";
import {_SchemaTable} from "./table/_SchemaTable";

export async function _getSchemaObjectTable(): Promise<_ISqlTable> {
    let schemaObjectTable = await _loadSchemaObject<_SchemaTable>(SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaTable_TableId);
    return schemaObjectTable.getSqlTable();
}