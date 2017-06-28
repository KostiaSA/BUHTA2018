import {ISchemaObject} from "./ISchemaObject";

export interface ISchemaTable extends ISchemaObject {
    sqlName?: string;
}

export class SchemaTable<ISchemaTable> {

}