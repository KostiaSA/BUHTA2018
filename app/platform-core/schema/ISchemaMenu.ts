import {ISchemaObject} from "./ISchemaObject";
import {SchemaObject} from "./SchemaObject";
import {IAction} from "../actions/IAction";

export interface ISchemaMenu extends ISchemaObject {
    template: string;
    items: ISchemaMenuItem[];
}

export interface ISchemaMenuItem {
    label: string;
    action:IAction;

    icon?: string;
    items?: ISchemaMenuItem[];
}

export class SchemaMenu extends SchemaObject<ISchemaMenu> {

}