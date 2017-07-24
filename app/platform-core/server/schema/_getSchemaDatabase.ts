import {_ISqlTable} from "./database/_SqlTable";
import {_loadSchemaObject} from "./_loadSchemaObject";
import {CoreConst} from "../../CoreConst";
import {SchemaTable} from "../../schema/table/SchemaTable";
import {_SchemaTable} from "./table/_SchemaTable";
import {_SchemaDatabase} from "./database/_SchemaDatabase";
import {SchemaDatabase} from "../../schema/database/SchemaDatabase";

export async function _getSchemaDatabase(): Promise<_SchemaDatabase> {
    return _loadSchemaObject<_SchemaDatabase>(SchemaDatabase.classInfo.recordIdPrefix + ":" + CoreConst.Schema_DatabaseId);
}