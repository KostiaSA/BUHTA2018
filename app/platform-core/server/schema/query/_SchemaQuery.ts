
import {_SchemaObject} from "../../_SchemaObject";
import {ISchemaQueryProps} from "../../../schema/query/ISchemaQueryProps";
import {SchemaQuery} from "../../../schema/query/SchemaQuery";

export class _SchemaQuery extends _SchemaObject<ISchemaQueryProps> {
    static classInfo  = { ...SchemaQuery.classInfo, constructor:_SchemaQuery };
}