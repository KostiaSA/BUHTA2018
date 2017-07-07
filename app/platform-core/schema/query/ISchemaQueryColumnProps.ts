import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";

export interface ISchemaQueryColumnProps {
    fieldCaption?: string;
    fieldSource?: string;  // название поля - источника
    tableId?: string;
    children?: ISchemaQueryColumnProps[];
}

