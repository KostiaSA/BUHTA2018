import * as React from "react";

import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
import {IFormPanelProps, BaseFormPanel} from "../../platform-core/components/BaseFormPanel";
import {FormSaveButton} from "../../platform-core/components/FormSaveButton";
import {Test1} from "../../platform-core/components/Test1";

export interface IPageTemplateProps {

}

class AppFormPanel extends BaseFormPanel {
    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;

    render(){
        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        return (
            <Form layout="horizontal">
                <FormInput
                    {...layout}
                    label="name3"
                    bindProperty="name"
                    rules={[{required: true, message: 'введи name3!'}]}
                />
                <FormInput
                    {...layout}
                    label="description3"
                    bindProperty="description"
                    rules={[{required: true, message: 'введи description3!'}]}
                />
                <Col span={24} offset={6}><FormSaveButton/></Col>
                <Test1/>
            </Form>
        )
    }
}
const FormPanel = Form.create<IFormPanelProps>(AppFormPanel.formOptions)(AppFormPanel as any) as typeof AppFormPanel;


export class SchemaAppDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaAppDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайера SchemaApp";


    renderChildren(): JSX.Element {

        return (

            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО дизайер SchemaApp @@{this.schemaPage.props.id}
                <a href="/">на главную {(new Date()).toString()}</a>
                <Row gutter={0}>
                    <Col className="gutter-row" span={12}>
                        <FormPanel editedObject={this.designedObject.props} onSave={this.onSaveButtonClick} onFieldsChange={()=>{this.forceUpdate()}}/>
                    </Col>
                </Row>
            </div>

        )
    }


}

