import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";

export interface ISchemaQueryColumnProps {
    key: string;
    fieldCaption?: string;
    fieldSource?: string;  // название поля - источника
    isDisabled?: boolean;
    isHidden?: boolean;
    tableId?: string;
    tableAlias?: string;
    children?: ISchemaQueryColumnProps[];
}

