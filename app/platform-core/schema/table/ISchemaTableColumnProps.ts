import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {IStringSqlDataTypeProps} from "./datatypes/IStringSqlDataTypeProps";
import {IIntegerSqlDataTypeProps} from "./datatypes/IIntegerSqlDataTypeProps";
import {ISqlDataTypeProps} from "./datatypes/ISqlDataTypeProps";

export interface ISchemaTableColumnProps {
    name: string;
    dataType: ISqlDataTypeProps;
    primaryKey?: boolean;
    description: string;
    position?: number;
}

