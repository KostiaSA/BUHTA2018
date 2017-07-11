import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {SchemaObject} from "./SchemaObject";
import {ISchemaAppProps} from "./ISchemaApp";

export class SchemaApp extends SchemaObject<ISchemaAppProps> {
    static className="platform-core:SchemaApp";
    static designerUrl="admin/schema-app-designer";

}

