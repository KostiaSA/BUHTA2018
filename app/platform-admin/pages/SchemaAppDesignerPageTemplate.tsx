import * as React from "react";
import {Button} from "antd";
import {PageTemplate} from "../../platform-core/components/PageTemplate";


export interface IPageTemplateProps {

}

export class SchemaAppDesignerPageTemplate extends PageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaAppDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайера SchemaApp";

    renderPage(): JSX.Element {
        return (
            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО дизайер SchemaApp {this.schemaPage.props.id}
                <br/>
                <Button type="primary" >Сохранить1</Button>
                {this.props.children}
                <a href="/">на главную {(new Date()).toString()}</a>
            </div>
        )
    }

}