import {ISchemaObject} from "./ISchemaObject";

export interface ISchemaPage extends ISchemaObject {
    template: string;
    mainMenuId?:string;
}