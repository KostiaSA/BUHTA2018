import {ISchemaObject} from "./ISchemaObject";

export interface ISchemaPage extends ISchemaObject {
    url:string;
    template: string;
    title?:string;
    mainMenuId?:string;
}