import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";

export interface ISchemaTableProps extends ISchemaObjectProps {
    sqlName?: string;
    columns:ISchemaTableColumnProps[];
}

