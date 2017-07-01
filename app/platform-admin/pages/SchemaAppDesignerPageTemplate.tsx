import * as React from "react";

import {Icon, Input, Button, Form, Row, Col, LocaleProvider,DatePicker} from 'antd';
import * as Antd from 'antd';
import {PageTemplate} from "../../platform-core/components/PageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
//import enUS from 'antd/lib/locale-provider/ru_RU';

export interface IPageTemplateProps {

}

export class SchemaAppDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaAppDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайера SchemaApp";

    renderChildren(): JSX.Element {
        return (

                <div>
                    { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                    ЭТО дизайер SchemaApp @@{this.schemaPage.props.id}
                    <br/>
                    <Button type="primary">Сохранить1</Button>
                    {this.props.children}
                    <a href="/">на главную {(new Date()).toString()}</a>
                    <Row gutter={0}>
                        <Col className="gutter-row" span={12}>
                            <Form layout="vertical" onSubmit={() => {
                            }}>
                                <Form.Item
                                >

                                    <Input prefix={<Icon type="user" style={{fontSize: 18}}/>} placeholder="Username"/>
                                    <DatePicker />

                                </Form.Item>
                                <Form.Item
                                >

                                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                           placeholder="Password"/>

                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"

                                    >
                                        Log in
                                    </Button>
                                    <Antd.Button
                                        type="primary"
                                        htmlType="submit"

                                    >
                                        Log in 2
                                    </Antd.Button>
                                </Form.Item>
                            </Form>

                        </Col>
                    </Row>
                </div>

        )
    }

}