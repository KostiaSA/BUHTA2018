import * as React from "react";

import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
//import enUS from 'antd/lib/locale-provider/ru_RU';

export interface IPageTemplateProps {

}


export class SchemaAppDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

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


    renderChildren(): JSX.Element {
        //console.log("SchemaAppDesignerPageTemplate renderChildren()",this.designedObject.props);

        let layout = {labelCol: this.labelCol, wrapperCol: this.wrapperCol, bindObject: this.designedObject.props};

        return (

            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО дизайер SchemaApp @@{this.schemaPage.props.id}
                <a href="/">на главную {(new Date()).toString()}</a>
                <Row gutter={0}>
                    <Col className="gutter-row" span={12}>
                        <Form layout="horizontal">

                            <FormInput
                                {...layout}
                                label="name"
                                bindProperty="name"
                            />
                            <FormInput
                                {...layout}
                                label="description"
                                bindProperty="description"
                            />

                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }


}