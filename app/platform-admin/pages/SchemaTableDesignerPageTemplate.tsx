import * as React from "react";
import * as ReactDOM from "react-dom";

const Sortable = require("sortablejs");

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
} from "../../platform-core/schema/table/datatypes/SqlDataType";
import {ISqlDataTypeProps} from "../../platform-core/schema/table/datatypes/ISqlDataTypeProps";
import {CSSProperties} from "react";
import {syncSchemaTableApiRequest} from "../../platform-core/schema/table/api/syncSchemaTableApiRequest";
import {TableDataSourceHelper} from "../../platform-core/utils/TableDataSourceHelper";
import {IPageTemplateClassInfo} from "../../platform-core/components/PageTemplate";
import {AdminTheme} from "../adminTheme";
import isDivisibleBy = require("validator/lib/isDivisibleBy");
import {arrayExchangeItems} from "../../platform-core/utils/arrayExchangeItems";
import {SchemaObject} from "../../platform-core/schema/SchemaObject";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {getRandomString} from "../../platform-core/utils/getRandomString";
import {StringSqlDataType} from "../../platform-core/schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IStringSqlDataTypeProps";
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
        this.editedTable.columns.forEach((item, index) => {
            item.position = index + 0
        });

        if (!this.columnSearchValue || this.columnSearchValue === "")
            return this.editedTable.columns;
        else {
            let value = this.columnSearchValue.toLocaleLowerCase();
            return this.editedTable.columns.filter((col: ISchemaTableColumnProps) => {
                return col.name.toLocaleLowerCase().indexOf(value) >= 0;
            });
        }
    }

    columnsSortable: any;

    initTableHeadersSorter() {
        let container = ReactDOM.findDOMNode(this);

        let sortable = Sortable.create($(container).find("theader?")[0], {
            animation: 125,
            handle: ".fa-bars",
            onEnd: (evt: any) => {
                console.log(evt.oldIndex, evt.newIndex);
                let a = this.editedTable.columns;
                let _old = evt.oldIndex;
                let _new = evt.newIndex;
                if (_new > _old)
                    this.editedTable.columns = [...a.slice(0, _old), ...a.slice(_old + 1, _new + 1), a[_old], ...a.slice(_new + 1)];
                else
                    this.editedTable.columns = [...a.slice(0, _new), a[_old], ...a.slice(_new, _old), ...a.slice(_old + 1)];

                this.forceUpdate();
            },

        });

    }

    initColumnsSorter() {
        let container = ReactDOM.findDOMNode(this);
        let tbody = $(container).find("tbody")[0];
        if (tbody) {
            let sortable = Sortable.create($(container).find("tbody")[0], {
                animation: 125,
                handle: ".fa-bars",
                onEnd: (evt: any) => {
                    console.log(evt.oldIndex, evt.newIndex);
                    let a = this.editedTable.columns;
                    let _old = evt.oldIndex;
                    let _new = evt.newIndex;
                    if (_new > _old)
                        this.editedTable.columns = [...a.slice(0, _old), ...a.slice(_old + 1, _new + 1), a[_old], ...a.slice(_new + 1)];
                    else
                        this.editedTable.columns = [...a.slice(0, _new), a[_old], ...a.slice(_new, _old), ...a.slice(_old + 1)];

                    this.forceUpdate();
                },

            });
        }

    }

    destroyColumnsSorter() {
        if (this.columnsSortable) {
            this.columnsSortable.destroy();
            this.columnsSortable = null;
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.initColumnsSorter();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        this.initColumnsSorter();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.destroyColumnsSorter();
    }


    get editedColumnIsNew(): boolean {
        return !this.editedColumnCloned;
    }

    addColumnClickHandler = () => {
        this.editedColumn = {
            name: "новая колока",
            dataType: {
                className: StringSqlDataType.classInfo.className,
                maxLen: 50
            } as IStringSqlDataTypeProps
        };
        this.editedColumnCloned = undefined as any;
        this.forceUpdate();
        console.log("add");
    };

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
                    <Tabs defaultActiveKey={this.props.isInsertMode ? "main" : "columns"}
                          animated={{inkBar: true, tabPane: false}}>
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
                            key="columns">
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
                                    <Button style={{float: "right"}} onClick={() => this.addColumnClickHandler()}>Новая колонка</Button>
                                </Col>
                            </Row>
                            <Row>

                                <Table size="middle"
                                       className="columns-table"
                                       bordered rowKey="name"
                                       dataSource={this.getFilteredColumnList()}
                                       pagination={{pageSize: 100} as any}>
                                    <Column
                                        title={(
                                            <div style={{textAlign: "center", minWidth: 25}}>
                                                <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                                                <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                                            </div>
                                        )}
                                        key="move"
                                        render={ (text: any, record: ISchemaTableColumnProps) => (
                                            <div style={{textAlign: "center", cursor: "move"}}>
                                                <i className="fa fa-bars" aria-hidden="true"></i>
                                            </div>
                                        )}
                                    />
                                    <Column
                                        title="Позиция"
                                        key="position"
                                        render={ (text: any, record: ISchemaTableColumnProps) => (
                                            <div style={{textAlign: "center", cursor: "move"}}>
                                                <span>{record.position}</span>
                                            </div>
                                        )}
                                    />
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
                                        title="Описание"
                                        dataIndex="description"
                                    />
                                    <Column
                                        title="Аттрибуты"
                                        dataIndex="isHidden"
                                        render={ (text: any, record: ISchemaTableColumnProps) => {
                                            let attrs: string[] = [];
                                            if (record.primaryKey)
                                                attrs.push("primary key");
                                            return (
                                                <span>
                                                        {attrs.join(", ")}
                                                </span>
                                            )
                                        }}
                                    />
                                    <Column
                                        title="Действие"
                                        key="action"
                                        render={ (text: any, record: ISchemaTableColumnProps) => (
                                            <span>
                                                  <a href="#"
                                                     onClick={() => this.editColumnClickHandler(record)}>изм.</a>
                                                  <span className="ant-divider"/>
                                                  <a href="#" style={{color: "crimson"}}>удал.</a>
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
                                if (this.editedColumnIsNew) {
                                    this.editedTable.columns.push(this.editedColumn);
                                }
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
                        if (!this.editedColumnIsNew) {
                        let colIndex = this.editedTable.columns.indexOf(this.editedColumn);
                        this.editedTable.columns[colIndex] = this.editedColumnCloned;
                    }
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
                        isInsertMode={this.editedColumnIsNew}
                        />
                        </Modal>
                        </div>
                        )
                    }
                }

                const FormPanel=Form.create
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
                        selectValues={appState.getRegisteredSqlDataTypes().map((sqlDataTypeClass: ISqlDataTypeClassInfo) => [sqlDataTypeClass.className, sqlDataTypeClass.title])}
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
                    < IFormPanelProps > (TableColumnFormPanelW.formOptions)(TableColumnFormPanelW as any) as typeof
                        TableColumnFormPanelW;

                        export class SchemaTableDesignerPageTemplate extends SchemaObjectDesignerPageTemplate {

                            //static className: string = "platform-admin:SchemaTableDesignerPageTemplate";
                            //static pageTemplateName: string = "шаблон дизайнера SchemaTable";

                            static classInfo: IPageTemplateClassInfo = {
                            className: "platform-admin:SchemaTableDesignerPageTemplate",
                            constructor: SchemaTableDesignerPageTemplate,
                            pageTemplateName: "шаблон дизайнера SchemaTable"

                        };

                            async createNewDesignedObject(): Promise<SchemaObject<any>> {
                            let obj = new SchemaTable();
                            obj.props = {
                            id: SchemaTable.classInfo.recordIdPrefix + ":" + getRandomString(),
                            className: SchemaTable.classInfo.className,
                            name: "Новая таблица",
                            description: "",
                            columns: [
                        {
                            name: "id",
                            primaryKey: true,
                            //position:0,
                            dataType: {
                            className: StringSqlDataType.classInfo.className,
                            maxLen: 127
                        } as IStringSqlDataTypeProps

                        },
                            ]
                        };
                            return obj;
                        }


                            renderChildren(): JSX.Element {
                            console.log("renderChildren - mode", this, this.isInsertMode);

                            return (

                            <div>
                            <h2 style={{color: AdminTheme.schemaTableColor}}>таблица: {this.designedObject.props.name}</h2>

                            <Row gutter={0}>
                            <Col className="gutter-row" span={18}>
                            <FormPanel editedObject={this.designedObject.props}
                            isInsertMode={this.isInsertMode}
                            onSave={this.onSaveButtonClick}
                            onFieldsChange={() => {
                                this.forceUpdate()
                            }}/>
                            </Col>
                            </Row>
                            </div>

                            )
                        }


                        }

