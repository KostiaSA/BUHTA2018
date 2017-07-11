import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {ISchemaObjectClassInfo, SchemaObject} from "./SchemaObject";
import {ISchemaPageProps} from "./ISchemaPage";
import {appState} from "../AppState";
import {IPageTemplateProps} from "../components/PageTemplate";


export interface ISchemaPageClassInfo extends ISchemaObjectClassInfo<typeof SchemaPage> {
    designerUrl: string;
}

export class SchemaPage extends SchemaObject<ISchemaPageProps> {
    static className = "platform-core:SchemaPage";
    static designerUrl = "admin/schema-page-designer";

    static classInfo: ISchemaPageClassInfo = {
        className: "platform-core:SchemaObject",
        constructor: SchemaPage,
        designerUrl: "admin/schema-page-designer"
    }

}

// export async function createSchemaPage(pageId: string): Promise<SchemaPage> {
//     let page = new SchemaPage();
//     await page.load(pageId);
//     console.log("+++", page.props);
//     return page;
// }