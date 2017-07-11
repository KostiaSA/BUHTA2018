import * as React from "react";

import {
    message,
    Alert,
    Modal,
    Table,
    Tabs,
    Icon,
    Input,
    Button,
    Form,
    Row,
    Col,
    LocaleProvider,
    Popconfirm,

} from 'antd';
import {SchemaObjectDesignerPageTemplate} from "./SchemaObjectDesignerPageTemplate";
import {FormInput} from "../../platform-core/components/FormInput";
import {FormItemColOption} from "antd/es/form/FormItem";
import {IFormPanelProps, BaseFormPanel} from "../../platform-core/components/BaseFormPanel";
import {FormSaveButton} from "../../platform-core/components/FormSaveButton";
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {clone} from "ejson";
import {appState} from "../../platform-core/AppState";
import {
    createSqlDataTypeObject, ISqlDataTypeClassInfo,
    SqlDataType
} from "../../platform-core/schema/table/SqlDataType";
import {ISqlDataTypeProps} from "../../platform-core/schema/table/ISqlDataTypeProps";
import {CSSProperties} from "react";
import {syncSchemaTableApiRequest} from "../../platform-core/schema/table/api/syncSchemaTableApiRequest";
import {TableDataSourceHelper} from "../../platform-core/utils/TableDataSourceHelper";
import {IPageTemplateClassInfo} from "../../platform-core/components/PageTemplate";
let Highlighter = require("react-highlight-words");

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

    columnSearchValue: string;

    getFilteredColumnList(): ISchemaTableColumnProps[] {
        if (!this.columnSearchValue || this.columnSearchValue === "")
            return this.editedTable.columns;
        else {
            let value = this.columnSearchValue.toLocaleLowerCase();
            return this.editedTable.columns.filter((col: ISchemaTableColumnProps) => {
                return col.name.toLocaleLowerCase().indexOf(value) >= 0;
            });
        }
    }

    //this.editedTable.columns

    editColumnClickHandler = (column: ISchemaTableColumnProps) => {
        this.editedColumn = column;
        this.editedColumnCloned = clone(this.editedColumn);
        this.forceUpdate();
        console.log("edit", column);
    };

    get editedTable(): ISchemaTableProps {
        return this.props.editedObject as ISchemaTableProps;
    }

    async synchronizeHandler() {
        try {
            let ans = await syncSchemaTableApiRequest({schemaTableId: this.editedTable.id});
            if (!ans.error)
                message.success("Синхронизация завершена", 3);
            else
                message.error("Ошибка, " + ans.error.substr(0, 50), 3);
        }
        catch (e) {
            message.error("Ошибка, " + e.toString().substr(0, 50), 3);
            console.error(e.toString());
        }

        console.log("synchronizeHandler");
    }


    render():JSX.Element {
        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;

        let buttonStyle: CSSProperties = {
            marginRight: 8,
            marginBottom: 12
        };

        console.log("render designer");
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Button>тест</Button>
                    </Col>
                    <Col span={12}>
                        <div style={{float: "right"}}>
                            <Popconfirm
                                title="Сохранить таблицу и синхронизировать с БД?"
                                onConfirm={() => {
                                    this.synchronizeHandler()
                                }}
                                okText="Да" cancelText="Нет">
                                <Button
                                    style={buttonStyle}
                                >
                                    Синхронизация
                                </Button>
                            </Popconfirm>
                            <FormSaveButton style={buttonStyle} text="Сохранить"/>
                        </div>
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
                                            mode="input"
                                            label="имя таблицы"
                                            bindProperty="name"
                                            rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                                        />
                                        <FormInput
                                            {...layout}
                                            mode="input"
                                            label="описание"
                                            bindProperty="description"
                                            rules={[{required: true, message: "описание должно быть заполнено"}]}
                                        />
                                    </Form>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane
                            tab={"Колонки" + (this.editedTable.columns.length > 0 ? " (" + this.editedTable.columns.length + ")" : "")}
                            key="2">
                            <Row style={{marginBottom: 10}}>
                                <Col span={12}>
                                    <Input.Search
                                        placeholder="поиск по имени колонки"
                                        style={{width: 300}}
                                        value={this.columnSearchValue}
                                        onChange={(event: any) => {
                                            this.columnSearchValue = event.target.value;
                                            this.forceUpdate();
                                        }}
                                        addonAfter={(
                                            <span style={{cursor: "default"}} onClick={() => {
                                                this.columnSearchValue = "";
                                                this.forceUpdate()
                                            }}
                                            >
                                            очистить
                                        </span>)
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <Button style={{float: "right"}}>Новая колонка</Button>
                                </Col>
                            </Row>
                            <Row>

                                <Table size="middle"
                                       bordered rowKey="name"
                                       dataSource={this.getFilteredColumnList()}
                                       pagination={{pageSize: 100} as any}>
                                    <Column
                                        title="Имя колонки"
                                        dataIndex="name"
                                        render={ (text: any, record: ISchemaTableColumnProps) => {
                                            let dataTypeInstance = createSqlDataTypeObject(record.dataType);
                                            return (
                                                <Highlighter
                                                    searchWords={[this.columnSearchValue]}
                                                    textToHighlight={record.name}
                                                >
                                                    {dataTypeInstance.dataTypeUserFriendly(this)}
                                                </Highlighter>
                                            )
                                        }}
                                    />
                                    <Column
                                        title="Тип данных"
                                        dataIndex="dataType"
                                        render={ (text: any, record: ISchemaTableColumnProps) => {
                                            let dataTypeInstance = createSqlDataTypeObject(record.dataType);
                                            return (
                                                <span>
                                                   {dataTypeInstance.dataTypeUserFriendly(this)}
                                               </span>
                                            )
                                        }}
                                    />
                                    <Column
                                        title="Действие"
                                        key="action"
                                        render={ (text: any, record: ISchemaTableColumnProps) => (
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
                    width={750}
                    onOk={() => {
                        this.tableColumnFormPanel.validateFieldsOk().then((ok) => {
                            if (ok) {
                                this.tableColumnFormPanel.onClickSaveButton();
                                this.editedColumn = undefined as any;
                                this.forceUpdate();
                            }
                            else {
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
        let editedTableColumn = this.props.editedObject as ISchemaTableColumnProps;
        if (!editedTableColumn)
            return null;

        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;

        let dataTypeEditor: any = null;

        if (editedTableColumn.dataType) {
            dataTypeEditor = appState.getRegisteredClassInfo<ISqlDataTypeClassInfo>(editedTableColumn.dataType.className).renderEditor(editedTableColumn, layout);
        }

        return (
            <Row>
                <Tabs defaultActiveKey="main" animated={{inkBar: true, tabPane: false}}>
                    <TabPane tab="SQL" key="main">
                        <Row>
                            <Col>
                                <Form layout="horizontal">
                                    <FormInput
                                        {...layout}
                                        mode="input"
                                        label="имя колонки"
                                        bindProperty="name"
                                        rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                                    />
                                    <FormInput
                                        {...layout}
                                        mode="select"
                                        label="тип данных"
                                        bindProperty="dataType.className"
                                        style={{maxWidth: 250}}
                                        selectValues={appState.getRegisteredSqlDataTypes().map((sqlDataTypeClass) => sqlDataTypeClass.className)}
                                        rules={[{required: true, message: "тип данных должнен быть заполнен"}]}
                                    />
                                    {dataTypeEditor}
                                    <FormInput
                                        {...layout}
                                        mode="checkbox"
                                        label="первичный ключ"
                                        bindProperty="primaryKey"
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

    //static className: string = "platform-admin:SchemaTableDesignerPageTemplate";
    //static pageTemplateName: string = "шаблон дизайнера SchemaTable";

    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:SchemaTableDesignerPageTemplate",
        constructor: SchemaTableDesignerPageTemplate,
        pageTemplateName: "шаблон дизайнера SchemaTable"

    };


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

