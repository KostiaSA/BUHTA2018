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
import {IPageTemplateClassInfo, PageTemplate} from "../../platform-core/components/PageTemplate";
import {SchemaObject} from "../../platform-core/schema/SchemaObject";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {getRandomString} from "../../platform-core/utils/getRandomString";
import {StringSqlDataType} from "../../platform-core/schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IStringSqlDataTypeProps";
import {ISchemaTableRow, SchemaTableRow} from "../schema/table/SchemaTableRow";
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



    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
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
                                    //this.synchronizeHandler()
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
                </Row>

            </div>
        )
    }
}

const FormPanel = Form.create
    < IFormPanelProps > (TableFormPanel.formOptions)(TableFormPanel as any) as typeof TableFormPanel;


export class SchemaFormPageTemplate extends PageTemplate {

    //static className: string = "platform-admin:SchemaTableDesignerPageTemplate";
    //static pageTemplateName: string = "шаблон дизайнера SchemaTable";

    static classInfo: IPageTemplateClassInfo = {
        className: "platform-core:SchemaFormPageTemplate",
        constructor: SchemaFormPageTemplate,
        pageTemplateName: "шаблон формы редактирования таблицы"

    };

    editedObject:SchemaTableRow<any>;
    isInsertMode: boolean = false;

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

    onSaveButtonClick = () => {
        this.saveDesignedObject();
    };

    async saveDesignedObject() {
        await this.editedObject.save();
        this.forceUpdate();
        console.log("Запись сохранена");
        message.success("Запись сохранена");

    };


    renderChildren(): JSX.Element {
        console.log("renderChildren - mode", this, this.isInsertMode);

        return (

            <div>
                <h2 style={{color: "green"}}>запись: {"this.designedObject.props.name"}</h2>

                <Row gutter={0}>
                    <Col className="gutter-row" span={18}>
                        <FormPanel editedObject={this.editedObject.props}
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
