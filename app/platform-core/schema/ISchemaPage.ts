import {ISchemaObjectProps} from "./ISchemaObject";

export interface ISchemaPageProps extends ISchemaObjectProps {
    url:string;
    template: string;
    title?:string;
    mainMenuId?:string;
}