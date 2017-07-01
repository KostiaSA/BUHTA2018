import {ISchemaObjectProps} from "./ISchemaObject";
import {SchemaObject} from "./SchemaObject";
import {IAction} from "../actions/IAction";

export interface ISchemaMenuProps extends ISchemaObjectProps {
    template: string;
    items: ISchemaMenuItem[];
}

export interface ISchemaMenuItem {
    label: string;
    action:IAction;

    icon?: string;
    items?: ISchemaMenuItem[];
}

