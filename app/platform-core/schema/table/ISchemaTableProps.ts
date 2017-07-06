import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";

export interface ISchemaTableProps extends ISchemaObjectProps {
    sqlName?: string;
    columns: ISchemaTableColumnProps[];
}

