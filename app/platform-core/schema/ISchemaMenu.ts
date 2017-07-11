import {ISchemaObjectProps} from "./ISchemaObject";
import {SchemaObject} from "./SchemaObject";
import {IActionProps} from "../actions/IActionProps";

export interface ISchemaMenuProps extends ISchemaObjectProps {
    template: string;
    items: ISchemaMenuItem[];
}

export interface ISchemaMenuItem {
    label: string;
    action:IActionProps;

    icon?: string;
    items?: ISchemaMenuItem[];
}

