import * as React from "react";

import {message, Alert,Modal, Table, Tabs, Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
import {IFormPanelProps, BaseFormPanel} from "../../platform-core/components/BaseFormPanel";
import {FormSaveButton} from "../../platform-core/components/FormSaveButton";
import isDivisibleBy = require("validator/lib/isDivisibleBy");
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {clone} from "ejson";

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


    tableColumnFormPanel: BaseFormPanel;
    editedColumn: ISchemaTableColumnProps;
    editedColumnCloned: ISchemaTableColumnProps;

    editColumnClickHandler = (column: ISchemaTableColumnProps) => {
        this.editedColumn = column;
        this.editedColumnCloned = clone(this.editedColumn);
        this.forceUpdate();
        console.log("edit", column);
    };

    get editedTable(): ISchemaTableProps {
        return this.props.editedObject as ISchemaTableProps;
    }

    render() {
        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;


        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Button>тест</Button>
                    </Col>
                    <Col span={12}>
                        <FormSaveButton style={{float: "right"}} text="Сохранить"/>
                    </Col>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="main" animated={{inkBar: true, tabPane: false}}>
                        <TabPane tab="Параметры" key="main">
                            <Row>
                                <Col>
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
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Колонки" key="2">
                            <Row>
                                <Button style={{marginBottom: 10, float: "right"}}>Новая колонка</Button>
                            </Row>
                            <Row>


                                <Table size="middle" bordered dataSource={this.editedTable.columns as any}>
                                    <Column
                                        title="Колонка"
                                        dataIndex="name"
                                    />
                                    <Column
                                        title="Тип данных"
                                        dataIndex="dataType"
                                    />
                                    <Column
                                        title="Действие"
                                        key="action"
                                        render={ (text: any, record: any) => (
                                            <span>
                                                  <a href="#" onClick={() => this.editColumnClickHandler(record)}>изменить</a>
                                                  <span className="ant-divider"/>
                                                  <a href="#">удалить</a>
                                            </span>
                                        )}
                                    />
                                </Table>


                            </Row>
                        </TabPane>
                        <TabPane tab="Индексы" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Row>
                <Modal
                    title={
                        <span>редактор колонки: <strong>{this.editedColumn ? this.editedColumn.name : ""}</strong></span>}
                    visible={this.editedColumn !== undefined}
                    onOk={() => {
                        this.tableColumnFormPanel.validateFieldsOk().then((ok) => {
                            if (ok) {
                                this.tableColumnFormPanel.onClickSaveButton();
                                this.editedColumn = undefined as any;
                                this.forceUpdate();
                            }
                            else{
                                message.error("Есть ошибки, сохранение невозможно");
                            }
                        });
                    }}
                    onCancel={() => {
                        let colIndex = this.editedTable.columns.indexOf(this.editedColumn);
                        this.editedTable.columns[colIndex] = this.editedColumnCloned;
                        this.editedColumn = undefined as any;
                        this.forceUpdate();
                    }}
                >
                    <TableColumnFormPanel
                        panelRef={(panel: BaseFormPanel) => {
                            this.tableColumnFormPanel = panel;
                         //   console.log("this.tableColumnFormPanel",this.tableColumnFormPanel)

                        }}
                        editedObject={this.editedColumn}
                    />
                </Modal>
            </div>
        )
    }
}

const FormPanel = Form.create
    < IFormPanelProps > (TableFormPanel.formOptions)(TableFormPanel as any) as typeof TableFormPanel;

class TableColumnFormPanelW extends BaseFormPanel {
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

        let editedTableColumn = this.props.editedObject as ISchemaTableColumnProps;
        return (
            <Row>
                <Tabs defaultActiveKey="main" animated={{inkBar: true, tabPane: false}}>
                    <TabPane tab="SQL" key="main">
                        <Row>
                            <Col>
                                <Form layout="horizontal">
                                    <FormInput
                                        {...layout}
                                        label="имя колонки"
                                        bindProperty="name"
                                        rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                                    />
                                    <FormInput
                                        {...layout}
                                        label="тип данных"
                                        bindProperty="dataType"
                                        rules={[{required: true, message: "тип данных должнен быть заполнен"}]}
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="В таблицах" key="2">
                        XXX
                    </TabPane>
                    <TabPane tab="В формах" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </Row>
        )
    }
}

const TableColumnFormPanel = Form.create
    < IFormPanelProps > (TableColumnFormPanelW.formOptions)(TableColumnFormPanelW as any) as typeof TableColumnFormPanelW;

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

