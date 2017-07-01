import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {PageTemplate} from "../../platform-core/components/PageTemplate";
import {AdminMainPageTemplate} from "./AdminMainPageTemplate";
import {SchemaObject} from "../../platform-core/schema/SchemaObject";

export interface ISchemaObjectDesignerPageTemplateProps {

}

export class SchemaObjectDesignerPageTemplate extends AdminMainPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaObjectDesignerPageTemplate";
    static pageTemplateName: string = "шаблон страницы редактирования schemaobject";


    designedObject: SchemaObject<any>;

    renderTop(): JSX.Element {
        return (
            <div>{super.renderTop()}дизайнер schema object НАЧАЛО</div>
        );
    }

    renderBottom(): JSX.Element {
        return (
            <div>дизайнер schema object КОНЕЦ{super.renderBottom()}</div>
        );
    }

    async loadData() {

        await super.loadData();
        console.log("load schema objext");
         // if (!this.designedObject) {
         //     this.designedObject = new SchemaObject<>();
         //     await this.schemaPage.load((document as any).schemaPageId);
         // }
    }

}