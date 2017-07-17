import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {ISchemaObjectClassInfo, SchemaObject} from "./SchemaObject";
import {ISchemaPageProps} from "./ISchemaPage";
import {appState} from "../AppState";
import {IPageTemplateProps} from "../components/PageTemplate";
import {objectToUrlParams} from "../utils/objectToUrlParams";


export interface ISchemaPageClassInfo extends ISchemaObjectClassInfo<typeof SchemaPage> {

}

export class SchemaPage extends SchemaObject<ISchemaPageProps> {
    //static className = "platform-core:SchemaPage";
    //static designerUrl = "admin/schema-page-designer";

    static classInfo: ISchemaPageClassInfo = {
        title:"Страница",
        className: "platform-core:SchemaPage",
        description:"Страница приложения",
        constructor: SchemaPage,
        //designerUrl: "admin/schema-page-designer",
        recordIdPrefix: "schema-page"
    };

    openInNewTab(params?: any) {
        let paramsStr = "";
        if (params)
            paramsStr = "?" + objectToUrlParams(params);
        let win = window.open(this.props.url + paramsStr, '_blank');
    }
}

// export async function createSchemaPage(pageId: string): Promise<SchemaPage> {
//     let page = new SchemaPage();
//     await page.load(pageId);
//     console.log("+++", page.props);
//     return page;
// }