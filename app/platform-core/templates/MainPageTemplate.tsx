import * as React from "react";
import {PageTemplate} from "../components/PageTemplate";
import {SchemaPage} from "../schema/SchemaPage";


export interface IPageTemplateProps {

}

export class MainPageTemplate extends PageTemplate {

    static pageTemplateId: string = "platform-core/templates/MainPageTemplate";
    static pageTemplateName: string = "шаблон главной страницы";

    async loadData() {
        await super.loadData();
    }


    renderPage(): JSX.Element {
        return (
            <div>это главная страница {this.props.schemaPageId}<br/>{this.props.children}</div>
        )
    }

}