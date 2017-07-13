import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {ISchemaObjectClassInfo, SchemaObject} from "./SchemaObject";
import {ISchemaMenuProps} from "./ISchemaMenu";



export interface ISchemaMenuClassInfo extends ISchemaObjectClassInfo<typeof SchemaMenu> {

}

export class SchemaMenu extends SchemaObject<ISchemaMenuProps> {
//    static className="platform-core:SchemaMenu";
//    static designerUrl="admin/schema-menu-designer";
    static classInfo: ISchemaMenuClassInfo = {
        title:"Меню",
        className: "platform-core:SchemaMenu",
        constructor: SchemaMenu,
        //designerUrl: "admin/schema-menu-designer",
        recordIdPrefix:"schema-menu"
    }

}

