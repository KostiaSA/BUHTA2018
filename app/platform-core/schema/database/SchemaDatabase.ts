import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaDatabaseProps} from "./ISchemaDatabaseProps";


export interface ISchemaDatabaseClassInfo extends ISchemaObjectClassInfo<typeof SchemaDatabase> {

}

export class SchemaDatabase extends SchemaObject<ISchemaDatabaseProps> {

    static classInfo: ISchemaDatabaseClassInfo = {
        title: "База данных",
        description: "База данных",
        className: "platform-core:SchemaDatabase",
        constructor: SchemaDatabase,
        recordIdPrefix: "schema-database"
    };

}