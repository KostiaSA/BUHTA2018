import * as React from "react";

import {Table, Tabs, Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
import {IFormPanelProps, BaseFormPanel} from "../../platform-core/components/BaseFormPanel";
import {FormSaveButton} from "../../platform-core/components/FormSaveButton";
import isDivisibleBy = require("validator/lib/isDivisibleBy");
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";

const {Column, ColumnGroup} = Table;

export interface IPageTemplateProps {

}

class TableFormPanel extends BaseFormPanel {
    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;

    render() {
        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;

        let editedTable=this.props.editedObject.props as ISchemaTableProps;

        return (
            <div>
                <Tabs defaultActiveKey="main" animated={{inkBar: true, tabPane: false}}>
                    <TabPane tab="Параметры" key="main">
                        <Form layout="horizontal">

                            <FormInput
                                {...layout}
                                label="имя таблицы"
                                bindProperty="name"
                                rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                            />
                            <FormInput
                                {...layout}
                                label="описание"
                                bindProperty="description"
                                rules={[{required: true, message: "описание должно быть заполнено"}]}
                            />
                        </Form>

                    </TabPane>
                    <TabPane tab="Колонки" key="2">
                        <Table dataSource={editedTable.columns as any}>
                            <Column
                                title="Колонка"
                                dataIndex="name"
                                key="name"
                            />
                            <Column
                                title="Тип данных"
                                dataIndex="type"
                                key="type"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="Индексы" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                <Col span={24} offset={6}><FormSaveButton label="Сохранить таблицу"/></Col>
            </div>
        )
    }
}
const FormPanel = Form.create<IFormPanelProps>(TableFormPanel.formOptions)(TableFormPanel as any) as typeof TableFormPanel;


export class SchemaTableDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaTableDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайнера SchemaTable";


    renderChildren(): JSX.Element {

        return (

            <div>
                { this.schemaPage.props.title ? <h1>{this.schemaPage.props.title}</h1> : null}
                ДИЗАЙНЕР ТАБЛИЦЫ
                <Row gutter={0}>
                    <Col className="gutter-row" span={18}>
                        <FormPanel editedObject={this.designedObject.props} onSave={this.onSaveButtonClick}
                                   onFieldsChange={() => {
                                       this.forceUpdate()
                                   }}/>
                    </Col>
                </Row>
            </div>

        )
    }


}

