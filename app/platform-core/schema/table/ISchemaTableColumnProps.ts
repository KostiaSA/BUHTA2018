import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";
import {ISqlDataTypeProps} from "./ISqlDataTypeProps";

export interface ISchemaTableColumnProps {
    name: string;
    dataType: ISqlDataTypeProps;
    primaryKey?: boolean;
}

