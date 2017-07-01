import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {PageTemplate} from "../../platform-core/components/PageTemplate";
import {AdminMainPageTemplate} from "./AdminMainPageTemplate";
import {createSchemaObject, SchemaObject} from "../../platform-core/schema/SchemaObject";
import {getParamFromUrl} from "../../platform-core/utils/getQueryParamFromUrl";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";

export interface ISchemaObjectDesignerPageTemplateProps {

}

export class SchemaObjectDesignerPageTemplate extends AdminMainPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaObjectDesignerPageTemplate";
    static pageTemplateName: string = "шаблон страницы редактирования schemaobject";


    orginalObjectPropsJson: string;
    designedObject: SchemaObject<ISchemaObjectProps>;

    needSave(): boolean {
        return this.orginalObjectPropsJson !== JSON.stringify(this.designedObject.props);
    }

    renderTop(): JSX.Element {
        return (
            <div>{super.renderTop()}дизайнер schema object НАЧАЛО:
                <h2>{this.designedObject.props.name}</h2>
            </div>
        );
    }

    async saveDesignedObject() {
        await this.designedObject.save();
        this.orginalObjectPropsJson = JSON.stringify(this.designedObject.props);
        this.forceUpdate();
        console.log("объект сохранен");
    };

    renderBottom(): JSX.Element {
        return (
            <div>дизайнер schema object КОНЕЦ
                <Button
                    disabled={!this.needSave()}
                    onClick={() => {
                        this.saveDesignedObject()
                    }}>
                    Сохранить
                </Button>
                {super.renderBottom()}
            </div>
        );
    }

    async loadData() {

        await super.loadData();
        console.log("load schema objext");
        if (!this.designedObject) {
            let designedObjectId = getParamFromUrl("objectid");
            if (designedObjectId) {
                this.designedObject = await createSchemaObject(designedObjectId);
                this.orginalObjectPropsJson = JSON.stringify(this.designedObject.props);
            }
        }
    }

}