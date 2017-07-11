import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {SchemaObject} from "./SchemaObject";
import {ISchemaMenuProps} from "./ISchemaMenu";

export class SchemaMenu extends SchemaObject<ISchemaMenuProps> {
    static className="platform-core:SchemaMenu";
    static designerUrl="admin/schema-menu-designer";

}

