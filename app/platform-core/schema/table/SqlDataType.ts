import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {ISqlDataTypeProps} from "./ISqlDataTypeProps";

export class SqlDataType<P extends ISqlDataTypeProps> {
    static className="?";
    props:P;
}