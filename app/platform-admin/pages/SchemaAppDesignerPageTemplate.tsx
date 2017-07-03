import * as React from "react";

import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
//import enUS from 'antd/lib/locale-provider/ru_RU';

export interface IPageTemplateProps {

}

class InternalSchemaAppDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaAppDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайера SchemaApp";

    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;

    async loadData() {

        await super.loadData();
        console.log("load schema object");
        if (this.designedObject) {
            this.props.form!.setFieldsValue(this.designedObject.props);
        }
    }

    renderChildren(): JSX.Element {
        console.log("SchemaAppDesignerPageTemplate renderChildren()",this.props.form);

        let layout = {labelCol: this.labelCol, wrapperCol: this.wrapperCol, bindObject: this.designedObject.props};
        return (

            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО дизайер SchemaApp @@{this.schemaPage.props.id}
                <a href="/">на главную {(new Date()).toString()}</a>
                <Row gutter={0}>
                    <Col className="gutter-row" span={12}>
                        <Form layout="horizontal">

                            {/*<FormInput*/}
                                {/*{...layout}*/}
                                {/*label="name"*/}
                                {/*bindProperty="name"*/}
                            {/*/>*/}
                            {/*<FormInput*/}
                                {/*{...layout}*/}
                                {/*label="description"*/}
                                {/*bindProperty="description"*/}
                            {/*/>*/}
                            <Form.Item>
                                {this.props.form!.getFieldDecorator('name', {
                                    initialValue:"жпа",
                                    rules: [{ required: true, message: 'Please input your name!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" />
                                )}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }


}

let exp=Form.create()(InternalSchemaAppDesignerPageTemplate as any) as any;
exp.pageTemplateId = "platform-admin/pages/SchemaAppDesignerPageTemplate";

export const SchemaAppDesignerPageTemplate = exp;
