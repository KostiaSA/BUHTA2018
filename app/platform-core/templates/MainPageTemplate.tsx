import * as React from "react";
import {PageTemplate} from "../components/PageTemplate";
import {SchemaPage} from "../schema/SchemaPage";
import {MenuWidget} from "../widgets/MenuWidget";
import {Button} from "antd";


export interface IPageTemplateProps {

}

export class MainPageTemplate extends PageTemplate {

    static pageTemplateId: string = "platform-core/templates/MainPageTemplate";
    static pageTemplateName: string = "шаблон главной страницы";

    renderPage(): JSX.Element {
        return (
            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО главная страница {this.schemaPage.props.id}
                <MenuWidget menuId={this.schemaPage.props.mainMenuId!}/>
                <br/>
                <Button type="primary" >Primary</Button>
                {this.props.children}
            </div>
        )
    }

}