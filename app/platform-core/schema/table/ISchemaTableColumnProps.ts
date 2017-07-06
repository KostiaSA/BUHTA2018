import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";

export interface ISchemaTableColumnProps extends  IStringSqlDataTypeProps, IIntegerSqlDataTypeProps{
    name: string;
    dataType:string;
}

