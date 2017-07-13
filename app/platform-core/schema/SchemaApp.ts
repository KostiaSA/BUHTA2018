import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {ISchemaObjectClassInfo, SchemaObject} from "./SchemaObject";
import {ISchemaAppProps} from "./ISchemaApp";

export interface ISchemaAppClassInfo extends ISchemaObjectClassInfo<typeof SchemaApp> {

}

export class SchemaApp extends SchemaObject<ISchemaAppProps> {
    //static className="platform-core:SchemaApp";
    //static designerUrl="admin/schema-app-designer";

    static classInfo: ISchemaAppClassInfo = {
        className: "platform-core:SchemaApp",
        constructor: SchemaApp,
        //designerUrl: "admin/schema-app-designer",
        recordIdPrefix:"schema-app"
    }


}

