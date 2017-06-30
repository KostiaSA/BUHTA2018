import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {SchemaObject} from "./SchemaObject";
import {ISchemaPage} from "./ISchemaPage";
import {appState} from "../AppState";
import {IPageTemplateProps} from "../components/PageTemplate";

export class SchemaPage extends SchemaObject<ISchemaPage> {
    show() {
        let pageTemplateClass = appState.getRegisteredPageTemplate(this.props.template);
        if (document.getElementById('content'))
            ReactDOM.unmountComponentAtNode(document.getElementById('content')!);
        ReactDOM.render(React.createElement(pageTemplateClass as any, {schemaPageId: this.props.id} as IPageTemplateProps), document.getElementById("content"));
        if (this.props.url)
            window.history.pushState("", "", this.props.url);
    }

}

export async function createSchemaPage(pageId: string): Promise<SchemaPage> {
    let page = new SchemaPage();
    await page.load(pageId);
    console.log("+++", page.props);
    return page;
}