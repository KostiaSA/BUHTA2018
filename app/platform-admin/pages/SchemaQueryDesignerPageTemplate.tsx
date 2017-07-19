import * as React from "react";

let ReactDOM = require('react-dom');
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
import {createSqlDataTypeObject, SqlDataType} from "../../platform-core/schema/table/datatypes/SqlDataType";
import {ISqlDataTypeProps} from "../../platform-core/schema/table/datatypes/ISqlDataTypeProps";
import {CSSProperties} from "react";
import {TableDataSourceHelper} from "../../platform-core/utils/TableDataSourceHelper";
import {getRandomString} from "../../platform-core/utils/getRandomString";
import {LazyRender} from "../../platform-core/components/LazyRender";
import {SchemaHelper} from "../../platform-core/schema/SchemaHelper";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {TableRowSelection} from "antd/es/table/Table";
import {FkSqlDataType} from "../../platform-core/schema/table/datatypes/FkSqlDataType";
import {IFkSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IFkSqlDataTypeProps";
import {AdminTheme} from "../adminTheme";
import {CodeEditor} from "../components/CodeEditor";
import {ISchemaPageClassInfo} from "../../platform-core/schema/SchemaPage";
import {IPageTemplateClassInfo} from "../../platform-core/components/PageTemplate";
import {emitQuerySqlApiRequest, IEmitQuerySqlApiResponse} from "../api/emitQuerySqlApiRequest";
import {reassignObject} from "../../platform-core/utils/reassignObject";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {QueryGrid} from "../../platform-core/components/QueryGrid";
import {SchemaObject} from "../../platform-core/schema/SchemaObject";
import {findSchemaObjectsForLookupApiRequest} from "../../platform-core/schema/api/findSchemaObjectsForLookupApiRequest";
let Highlighter = require("react-highlight-words");

const {Column, ColumnGroup} = Table;

export interface IPageTemplateProps {

}

interface IAddColumnsModal {
    visible: boolean;
    sourceTable?: ISchemaTableProps;
    childrenForAdd?: ISchemaQueryColumnProps[];
    columnSearchValue: string;
    selection: TableRowSelection<ISchemaTableColumnProps>;
    getFilteredColumnList(): ISchemaTableColumnProps[];
    selectedCols: ISchemaTableColumnProps[];
    handleOk: () => void;
    handleCancel: () => void;
}

class QueryFormPanel extends BaseFormPanel<IFormPanelProps> {
    labelCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 6},
    } as FormItemColOption;

    wrapperCol: FormItemColOption = {
        xs: {span: 24},
        sm: {span: 18},
    } as FormItemColOption;


    queryColumnFormPanel: BaseFormPanel<IFormPanelProps>;
    editedColumn: ISchemaQueryColumnProps;
    editedColumnCloned: ISchemaQueryColumnProps;

    testQueryId: string;
    testQueryRandom: string;

    sqlCodeMirrorSource: string = "";

    getRootTableModal = {
        tableSearchValue: "",
        async getFilteredTableList(): Promise<{ tableId: string, tableName: string }[]> {

            let ans = await findSchemaObjectsForLookupApiRequest({where: {className: SchemaTable.classInfo.className}});
            let values = ans.objects.map((table: any) => {
                return {tableId: table.id, tableName: table.name}
            });

            return values;
        },
    }

    addColumnsModal: IAddColumnsModal = {
        visible: false,
        columnSearchValue: "",
        selection: {},
        getFilteredColumnList(): ISchemaTableColumnProps[] {
            if (!this.sourceTable || !this.sourceTable.columns)
                return [];
            else if (!this.searchValue || this.searchValue === "")
                return this.sourceTable.columns;
            else {
                let value = this.searchValue.toLocaleLowerCase();
                return this.sourceTable.columns.filter((col: ISchemaTableColumnProps) => {
                    return col.name.toLocaleLowerCase().indexOf(value) >= 0;
                });
            }
        },
        selectedCols: [],
        handleOk(this: QueryFormPanel){
            console.log("ok");
            for (let col of this.addColumnsModal.selectedCols) {
                console.log("col.dataType.className", col.dataType.className);

                let newQueryCol: ISchemaQueryColumnProps = {
                    key: getRandomString(),
                    fieldCaption: col.name,
                    fieldSource: col.name,
                    //tableId?: col.dataType.t
                    //tableAlias?: string;
                    //children?: ISchemaQueryColumnProps[];
                };

                if (col.dataType.className === FkSqlDataType.classInfo.className) {
                    let fkCol = col.dataType as IFkSqlDataTypeProps;
                    newQueryCol.tableId = fkCol.fkTableId;
                    console.log("fkCol.fkTableId", fkCol);
                    //tableAlias?: string;
                    newQueryCol.children = [];

                }
                this.addColumnsModal.childrenForAdd!.push(newQueryCol);
            }
            this.addColumnsModal.visible = false;
            this.forceUpdate();
        },
        handleCancel(this: QueryFormPanel){
            this.addColumnsModal.visible = false;
            this.forceUpdate();
        }
    };


    async addColumnClickHandler(column: ISchemaQueryColumnProps): Promise<void> {
        this.addColumnsModal.sourceTable = await SchemaHelper.getSchemaObjectProps<ISchemaTableProps>(column.tableId!);
        this.addColumnsModal.visible = true;
        this.addColumnsModal.childrenForAdd = column.children || [];
        this.addColumnsModal.selection.selectedRowKeys = [];

        this.addColumnsModal.selection.onChange = (selectedRowKeys, selectedCols: any) => {
            this.addColumnsModal.selection.selectedRowKeys = selectedRowKeys;
            this.addColumnsModal.selectedCols = selectedCols;
            //console.log(`selectedRowKeys:`, selectedRowKeys, 'selectedRows: ', selectedRows);
            this.forceUpdate();
        };

        // this.addColumnsModal.selection.getCheckboxProps = (record) => ({
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

    deleteColumnClickHandler = (column: ISchemaQueryColumnProps) => {
        if (column === this.editedQuery) {
            this.editedQuery.tableId = undefined;
            this.editedQuery.children = [];
        }
        else {
            let query = new SchemaQuery();
            query.props = this.editedQuery;
            query.deleteColumn(column);
        }
        this.forceUpdate();
        console.log("delete", column);
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

    handleTestQuery = () => {
        this.testQueryId = this.editedQuery.id;
        this.testQueryRandom = getRandomString();
        this.forceUpdate();
    };

    handleTabChange = (activeTabKey: string) => {
        if (activeTabKey === "sql") {

            emitQuerySqlApiRequest({queryProps: this.editedQuery, dialect: "mssql"})
                .then((ans: IEmitQuerySqlApiResponse) => {
                    this.sqlCodeMirrorSource = ans.sql;
                    this.forceUpdate();
                })
                .catch((error: any) => {
                    this.sqlCodeMirrorSource = "ошибка";
                    console.error(error);
                    this.forceUpdate();
                });
        }

    };

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
        console.log("---filename---" + __filename);
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div style={{float: "right"}}>
                            <FormSaveButton style={buttonStyle} text="Сохранить"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Tabs
                        defaultActiveKey={this.props.isInsertMode ? "main" : "columns"}

                        animated={{inkBar: true, tabPane: false}}
                        onChange={this.handleTabChange}
                    >
                        <TabPane tab="Параметры" key="main">
                            <Row>
                                <Col>
                                    <Form layout="horizontal">
                                        <FormInput
                                            {...layout}
                                            mode="input"
                                            label="имя запроса"
                                            bindProperty="name"
                                            rules={[{required: true, message: "имя запроса должно быть заполнено"}]}
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
                            key="columns"
                        >
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
                                                                    <span style={{fontWeight: "bold"}}>
                                                                        {record.fieldSource}{arrow}
                                                                        <a href="#"
                                                                           onClick={() => this.addColumnClickHandler(record)}
                                                                           style={{color: AdminTheme.schemaTableColor}}>{tableName}
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
                                                       {record.fieldSource}
                                                    </span>
                                                )
                                            }
                                        }}
                                    />
                                    <Column
                                        title="Заголовок колонки"
                                        dataIndex="dataType"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {
                                            if (record.tableId) {
                                                return null;
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
                                        title="Аттрибуты"
                                        dataIndex="isHidden"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {
                                            if (record.tableId) {
                                                return null;
                                            }
                                            else {
                                                let attrs: string[] = [];
                                                if (record.isHidden)
                                                    attrs.push("скрытая");
                                                if (record.isDisabled)
                                                    attrs.push("отключена");
                                                return (
                                                    <span>
                                                        {attrs.join(", ")}
                                                    </span>
                                                )
                                            }
                                        }}
                                    />
                                    <Column
                                        title="Действие"
                                        key="action"
                                        render={ (text: any, record: ISchemaQueryColumnProps) => {

                                            let deleteTitle =
                                                <span>Удалить колонку: <strong>{record.fieldSource}</strong>?</span>;
                                            if (!record.fieldSource) {
                                                deleteTitle = <span>Удалить корневую таблицу?</span>;
                                            }

                                            let deleteConfirm = (
                                                <Popconfirm
                                                    title={deleteTitle}
                                                    onConfirm={() => {
                                                        this.deleteColumnClickHandler(record);
                                                    }}
                                                    okText="Удалить" cancelText="Нет">
                                                    <a href="#" style={{color: "crimson"}}>удал.</a>
                                                </Popconfirm>
                                            );
                                            if (record === this.editedQuery && !this.editedQuery.tableId)
                                                deleteConfirm = null as any;

                                            if (record.tableId) {
                                                return (
                                                    <span>
                                                        <a href="#" style={{color: AdminTheme.schemaTableColor}}
                                                           onClick={() => this.addColumnClickHandler(record)}>доб. колонки</a>
                                                        <span className="ant-divider"/>
                                                        {deleteConfirm}
                                                    </span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>
                                                        <a href="#" onClick={() => this.editColumnClickHandler(record)}>изм.</a>
                                                        <span className="ant-divider"/>
                                                        {deleteConfirm}
                                                    </span>
                                                )
                                            }
                                        }}
                                    />
                                </Table>


                            </Row>
                        </TabPane>
                        <TabPane tab="SQL" key="sql">
                            <Row>
                                <div>SQL код генерируется автоматически</div>
                                <CodeEditor
                                    code={this.sqlCodeMirrorSource}
                                    options={{mode: "sql", viewportMargin: Infinity}}
                                />
                            </Row>
                        </TabPane>
                        <TabPane tab="Тест" key="test" style={{display: "table-cell"}}>

                            <Button style={{marginBottom: 15}} onClick={this.handleTestQuery}>
                                Выполнить тестовый запрос
                            </Button>
                            <span style={{
                                marginLeft: 15,
                                color: "green"
                            }}>Сохраните запрос перед выполнением теста.</span>

                            <QueryGrid
                                queryId={this.testQueryId}
                                random={this.testQueryRandom}
                            />

                        </TabPane>
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
                        //let colIndex = this.editedQuery.срдвкут.indexOf(this.editedColumn);
                        reassignObject(this.editedColumn, this.editedColumnCloned);
                        this.editedColumn = undefined as any;
                        this.forceUpdate();
                    }}
                >
                    <QueryColumnFormPanel
                        panelRef={(panel: BaseFormPanel<IFormPanelProps>) => {
                            this.queryColumnFormPanel = panel;
                            //   console.log("this.queryColumnFormPanel",this.queryColumnFormPanel)

                        }}
                        editedObject={this.editedColumn}
                        isInsertMode={false}
                    />
                </Modal>
                {/* ----------------------- список колонок для добавления --------------------------------------  */}
                <Modal
                    title={
                        <span>добавление колонок из таблицы: <strong
                            style={{color: AdminTheme.schemaTableColor}}>{this.addColumnsModal.sourceTable ? this.addColumnsModal.sourceTable.name : ""}</strong></span>}
                    visible={this.addColumnsModal.visible}
                    width={750}

                    onOk={() => {
                        this.addColumnsModal.handleOk.call(this)
                    }}
                    onCancel={() => {
                        this.addColumnsModal.handleCancel.call(this)
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
                           rowSelection={this.addColumnsModal.selection}
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
                                let dataTypeInstance = createSqlDataTypeObject(record.dataType);
                                return (
                                    <span>
                                        {dataTypeInstance.dataTypeUserFriendly(this)}
                                    </span>
                                )
                            }}

                        />
                    </Table>
                    <Row >
                        <span>выбрано {this.addColumnsModal.selection.selectedRowKeys ? this.addColumnsModal.selection.selectedRowKeys!.length : "0"}
                            кол.</span>
                    </Row>
                </Modal>

                {/* ----------------------- выбор корневой таблицы --------------------------------------  */}
                <Modal
                    title={
                        <span>выберите корневую таблицу</span>}
                    visible={!this.editedQuery.tableId}
                    width={750}
                    onOk={() => {
                        if (this.editedQuery.tableId) {
                            this.forceUpdate();
                        }
                        else {
                            message.error("Таблица не заполнена");
                        }

                    }}
                    cancelText={null as any}
                    onCancel={() => {
                        delete this.editedQuery.tableId;
                        this.forceUpdate();
                    }}
                >
                    <LazyRender
                        params={{}}
                        render={async () => {

                            let ans = await findSchemaObjectsForLookupApiRequest({where: {className: SchemaTable.classInfo.className}});
                            let values = ans.objects.map((table: any) => {
                                return {value: table.id, text: table.name}
                            });

                            return (
                                <FormInput
                                    mode="lookup"
                                    label="запрос по таблице"
                                    bindProperty="tableId"
                                    style={{width: 500}}
                                    selectValues={values}
                                    rules={[{required: true, message: "таблица должна быть заполнена"}]}
                                />
                            )
                        }}
                    >
                    </LazyRender>

                </Modal>

            </div>
        )
    }
}

const FormPanel = Form.create
    < IFormPanelProps > (QueryFormPanel.formOptions)(QueryFormPanel as any) as typeof QueryFormPanel;

class QueryColumnFormPanelW extends BaseFormPanel<IFormPanelProps> {
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
                    <TabPane tab="Колонка" key="main">
                        <Row>
                            <Col>
                                <Form layout="horizontal">
                                    <FormInput
                                        {...layout}
                                        mode="input"
                                        label="колонка таблицы"
                                        bindProperty="fieldSource"
                                        rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                                    />
                                    <FormInput
                                        {...layout}
                                        mode="input"
                                        label="заголовок"
                                        bindProperty="fieldCaption"
                                        rules={[{required: true, message: "имя таблицы должно быть заполнено"}]}
                                    />

                                    <FormInput
                                        {...layout}
                                        mode="checkbox"
                                        label="скрытая"
                                        bindProperty="isHidden"
                                    />
                                    <FormInput
                                        {...layout}
                                        mode="checkbox"
                                        label="отключена"
                                        bindProperty="isDisabled"
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

//    static className: string = "platform-admin:SchemaQueryDesignerPageTemplate";
    //  static pageTemplateName: string = "шаблон дизайнера SchemaQuery";

    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:SchemaQueryDesignerPageTemplate",
        constructor: SchemaQueryDesignerPageTemplate,
        pageTemplateName: "шаблон дизайнера SchemaQuery"

    };

    async createNewDesignedObject(): Promise<SchemaObject<any>> {
        let obj = new SchemaQuery();
        obj.props = {
            id: SchemaQuery.classInfo.recordIdPrefix + ":" + getRandomString(),
            key: getRandomString(),
            className: SchemaQuery.classInfo.className,
            name: "Новый запрос",
            description: "",
            children: []
        };
        return obj;
    }

    renderChildren(): JSX.Element {

        return (

            <div>
                <h2 style={{color: AdminTheme.schemaQueryColor}}>запрос: {this.designedObject.props.name}</h2>
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

