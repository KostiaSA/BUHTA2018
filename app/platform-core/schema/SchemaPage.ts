import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {SchemaObject} from "./SchemaObject";
import {ISchemaPageProps} from "./ISchemaPage";
import {appState} from "../AppState";
import {IPageTemplateProps} from "../components/PageTemplate";

export class SchemaPage extends SchemaObject<ISchemaPageProps> {
    static className="platform-core/schema/SchemaPage";
    static designerUrl="admin/schema-page-designer";

}

// export async function createSchemaPage(pageId: string): Promise<SchemaPage> {
//     let page = new SchemaPage();
//     await page.load(pageId);
//     console.log("+++", page.props);
//     return page;
// }