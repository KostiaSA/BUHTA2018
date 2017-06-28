import {ISchemaObject} from "./ISchemaObject";
import {SchemaObject} from "./SchemaObject";

export interface ISchemaTable extends ISchemaObject {
    sqlName?: string;
}

export class SchemaTable extends SchemaObject<ISchemaTable> {

}