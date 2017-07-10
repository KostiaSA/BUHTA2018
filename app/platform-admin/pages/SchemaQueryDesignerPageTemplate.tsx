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
import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps";
import {ISchemaQueryColumnProps} from "../../platform-core/schema/query/ISchemaQueryColumnProps";
import {clone} from "ejson";
import {appState} from "../../platform-core/AppState";
import {createSqlDataTypeObject, SqlDataType} from "../../platform-core/schema/table/SqlDataType";
import {ISqlDataTypeProps} from "../../platform-core/schema/table/ISqlDataTypeProps";
import {CSSProperties} from "react";
import {TableDataSourceHelper} from "../../platform-core/utils/TableDataSourceHelper";
import {getRandomString} from "../../platform-core/utils/getRandomString";
import {LazyRender} from "../../platform-core/components/LazyRender";
import {SchemaHelper} from "../../platform-core/schema/SchemaHelper";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {TableRowSelection} from "antd/es/table/Table";
let Highlighter = require("react-highlight-words");

const {Column, ColumnGroup} = Table;

export interface IPageTemplateProps {

}

interface IAddColumnsModal {
    visible: boolean;
    sourceTable?: ISchemaTableProps;
    columnSearchValue: string;
    colSelection: TableRowSelection<ISchemaTableColumnProps>;
    getFilteredColumnList(): ISchemaTableColumnProps[];
}

class QueryFormPanel extends BaseFormPanel {
    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;


    queryColumnFormPanel: BaseFormPanel;
    editedColumn: ISchemaQueryColumnProps;
    editedColumnCloned: ISchemaQueryColumnProps;


    addColumnsModal: IAddColumnsModal = {
        visible: false,
        columnSearchValue: "",
        colSelection: {},
        getFilteredColumnList(): ISchemaTableColumnProps[] {
            //debugger
            if (!this.sourceTable || !this.sourceTable.columns)
                return [];
            else if (this.columnSearchValue === "")
                return this.sourceTable.columns;
            else {
                let value = this.columnSearchValue.toLocaleLowerCase();
                return this.sourceTable.columns.filter((col: ISchemaTableColumnProps) => {
                    return col.name.toLocaleLowerCase().indexOf(value) >= 0;
                });
            }
        }

    };


    async addColumnClickHandler(column: ISchemaQueryColumnProps): Promise<void> {
        this.addColumnsModal.sourceTable = await SchemaHelper.getSchemaObjectProps<ISchemaTableProps>(column.tableId!);
        this.addColumnsModal.visible = true;
        this.addColumnsModal.colSelection.selectedRowKeys = [];

        this.addColumnsModal.colSelection.onChange = (selectedRowKeys) => {
            this.addColumnsModal.colSelection.selectedRowKeys=selectedRowKeys;
            //console.log(`selectedRowKeys:`, selectedRowKeys, 'selectedRows: ', selectedRows);
            this.forceUpdate();
        };

        // this.addColumnsModal.colSelection.getCheckboxProps = (record) => ({
        //     disabled: false
        // });

        this.forceUpdate();
        // this.editedColumn = column;
        // this.editedColumnCloned = clone(this.editedColumn);
        // this.forceUpdate();
        // console.log("edit", column);
    };

    editColumnClickHandler = (column: ISchemaQueryColumnProps) => {
        this.editedColumn = column;
        this.editedColumnCloned = clone(this.editedColumn);
        this.forceUpdate();
        console.log("edit", column);
    };

    get editedQuery(): ISchemaQueryProps {
        return this.props.editedObject as ISchemaQueryProps;
    }

    getDefaultExpandedRowKeys(): string[] {
        let helper = new TableDataSourceHelper<ISchemaQueryColumnProps>([this.editedQuery]);

        helper.iterateAllNodes((node: ISchemaQueryColumnProps) => {
            if (!node.key)
                node.key = getRandomString();
        });

        return helper.getFolderNodes().map((node: ISchemaQueryColumnProps) => {
            return node.key;
        });
    }


    render(): JSX.Element {
        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;

        let buttonStyle: CSSProperties = {
            marginRight: 8,
            marginBottom: 12
        };

        console.log("render query designer");
        console.log("----------------------------------" + __filename + ":" + __dirname);
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Button>тест</Button>
                    </Col>
                    <Col span={12}>
                        <div style={{float: "right"}}>
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
                            tab={"Колонки" + (this.editedQuery.children!.length > 0 ? " (" + this.editedQuery.children!.length + ")" : "")}
                            key="2">
                            <Row>

                                <Table size="middle"
                                       bordered
                                       rowKey="key"
                                       dataSource={[this.editedQuery]}
                                       defaultExpandedRowKeys={this.getDefaultExpandedRowKeys()}
                                       pagination={{pageSize: 100} as any}>
                                    <Column
                                        title="Таблица/Колонка"
                                        dataIndex="name"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {
                                            if (record.tableId) {
                                                return (
                                                    <LazyRender
                                                        params={record.tableId}
                                                        render={async () => {
                                                            try {
                                                                let tableName = await SchemaHelper.getSchemaObjectName(record.tableId!);
                                                                let arrow = "=>";
                                                                if (record === this.editedQuery) {
                                                                    arrow = "";
                                                                }
                                                                return (
                                                                    <span>
                                                                        {record.fieldSource}{arrow}
                                                                        <a href="#"
                                                                           onClick={() => this.addColumnClickHandler(record)}
                                                                           style={{color: "goldenrod"}}>{tableName}
                                                                        </a>
                                                                    </span>

                                                                )
                                                            }
                                                            catch (e) {
                                                                throw  "fk => ошибка:" + record.tableId;
                                                            }
                                                        }}
                                                    >
                                                    </LazyRender>
                                                )

                                            }
                                            else {
                                                return (
                                                    <span>
                                                        {record.fieldCaption || record.tableId}
                                                    </span>
                                                )
                                            }
                                        }}
                                    />
                                    <Column
                                        title="Заголовок колонки"
                                        dataIndex="dataType"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {
                                            return (
                                                <span>
                                                   {record.fieldSource}
                                               </span>
                                            )
                                        }}
                                    />
                                    <Column
                                        title="Действие"
                                        key="action"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {

                                            if (record.tableId) {
                                                return (
                                                    <span>
                                                        <a href="#">добавить колонки</a>
                                                        <span className="ant-divider"/>
                                                        <a href="#" onClick={() => this.editColumnClickHandler(record)}>изменить</a>
                                                    </span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>
                                                        <a href="#" onClick={() => this.editColumnClickHandler(record)}>изменить</a>
                                                        <span className="ant-divider"/>
                                                        <a href="#">удалить</a>
                                                    </span>
                                                )
                                            }
                                        }}
                                    />
                                </Table>


                            </Row>
                        </TabPane>
                        <TabPane tab="Индексы" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Row>
                {/* ----------------------- редактор колонки --------------------------------------  */}
                <Modal
                    title={
                        <span>редактор колонки: <strong>{this.editedColumn ? this.editedColumn.fieldCaption : ""}</strong></span>}
                    visible={this.editedColumn !== undefined}
                    width={750}
                    onOk={() => {
                        this.queryColumnFormPanel.validateFieldsOk().then((ok) => {
                            if (ok) {
                                this.queryColumnFormPanel.onClickSaveButton();
                                this.editedColumn = undefined as any;
                                this.forceUpdate();
                            }
                            else {
                                message.error("Есть ошибки, сохранение невозможно");
                            }
                        });
                    }}
                    onCancel={() => {
                        // let colIndex = this.editedQuery.columns.indexOf(this.editedColumn);
                        // this.editedQuery.columns[colIndex] = this.editedColumnCloned;
                        // this.editedColumn = undefined as any;
                        // this.forceUpdate();
                    }}
                >
                    <QueryColumnFormPanel
                        panelRef={(panel: BaseFormPanel) => {
                            this.queryColumnFormPanel = panel;
                            //   console.log("this.queryColumnFormPanel",this.queryColumnFormPanel)

                        }}
                        editedObject={this.editedColumn}
                    />
                </Modal>
                {/* ----------------------- список колонок для добавления --------------------------------------  */}
                <Modal
                    title={
                        <span>добавление колонки, таблица: <strong>{this.addColumnsModal.sourceTable ? this.addColumnsModal.sourceTable.name : ""}</strong></span>}
                    visible={this.addColumnsModal.visible}
                    width={750}

                    onOk={() => {
                        // this.queryColumnFormPanel.validateFieldsOk().then((ok) => {
                        //     if (ok) {
                        //         this.queryColumnFormPanel.onClickSaveButton();
                        //         this.editedColumn = undefined as any;
                        //         this.forceUpdate();
                        //     }
                        //     else {
                        //         message.error("Есть ошибки, сохранение невозможно");
                        //     }
                        // });
                    }}
                    onCancel={() => {
                        // let colIndex = this.editedQuery.columns.indexOf(this.editedColumn);
                        // this.editedQuery.columns[colIndex] = this.editedColumnCloned;
                        // this.editedColumn = undefined as any;
                        // this.forceUpdate();
                    }}
                >
                    <Row style={{marginBottom: 10}}>
                        <Input.Search
                            placeholder="поиск по имени колонки"
                            style={{width: 300}}
                            value={this.addColumnsModal.columnSearchValue}
                            onChange={(event: any) => {
                                this.addColumnsModal.columnSearchValue = event.target.value;
                                this.forceUpdate();
                            }}
                            addonAfter={(
                                <span style={{cursor: "default"}} onClick={() => {
                                    this.addColumnsModal.columnSearchValue = "";
                                    this.forceUpdate()
                                }}
                                >
                                       очистить
                                    </span>)
                            }
                        />
                    </Row>

                    <Table size="small"
                           style={{marginBottom: 10}}
                           scroll={{y: 500}}
                           bordered
                           showHeader={true}
                           rowKey="name"
                           rowSelection={this.addColumnsModal.colSelection}
                           dataSource={this.addColumnsModal.getFilteredColumnList()}
                           pagination={false}>
                        <Column
                            title="Колонка"
                            dataIndex="name"
                            width={300}
                            render={ (text: any, record: ISchemaTableColumnProps) => {
                                return (
                                    <span>
                                         {record.name}
                                    </span>
                                )
                            }}
                        />
                        <Column
                            title="Тип данных"
                            dataIndex="dataType"
                            width={200}
                            render={ (text: any, record: ISchemaTableColumnProps) => {
                                return (
                                    <span>
                                        {"record.dataType"}
                                    </span>
                                )
                            }}
                        />
                    </Table>
                    <Row >
                        <span>выбрано {!!this.addColumnsModal.colSelection.selectedRowKeys? this.addColumnsModal.colSelection.selectedRowKeys!.length:"0"} кол.</span>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const FormPanel = Form.create
    < IFormPanelProps > (QueryFormPanel.formOptions)(QueryFormPanel as any) as typeof QueryFormPanel;

class QueryColumnFormPanelW extends BaseFormPanel {
    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;


    render() {

        let editedQueryColumn = this.props.editedObject as ISchemaQueryColumnProps;
        if (!editedQueryColumn)
            return null;

        let layout = {
            labelCol: this.labelCol,
            wrapperCol: this.wrapperCol,
        };

        const TabPane = Tabs.TabPane;

        let dataTypeEditor: any = null;

        // if (editedQueryColumn.dataType) {
        //     dataTypeEditor = appState.getRegisteredSqlDataType(editedQueryColumn.dataType.className).renderEditor(editedQueryColumn, layout);
        // }

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

const QueryColumnFormPanel = Form.create
    < IFormPanelProps > (QueryColumnFormPanelW.formOptions)(QueryColumnFormPanelW as any) as typeof QueryColumnFormPanelW;

export class SchemaQueryDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaQueryDesignerPageTemplate";
    static pageTemplateName: string = "шаблон дизайнера SchemaQuery";


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

