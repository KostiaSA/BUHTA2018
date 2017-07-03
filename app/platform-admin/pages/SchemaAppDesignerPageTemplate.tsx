import * as React from "react";

import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
//import enUS from 'antd/lib/locale-provider/ru_RU';

export interface IPageTemplateProps {

}


export class SchemaAppDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaAppDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайера SchemaApp";


    renderChildren(): JSX.Element {
        //console.log("SchemaAppDesignerPageTemplate renderChildren()",this.designedObject.props);
        return (

            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ЭТО дизайер SchemaApp @@{this.schemaPage.props.id}
                <a href="/">на главную {(new Date()).toString()}</a>
                <Row gutter={0}>
                    <Col className="gutter-row" span={12}>
                        <Form layout="vertical">

                            <FormInput bindObject={this.designedObject.props} bindProperty="name"/>

                            <Form.Item>

                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="Password"/>

                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        )
    }


}