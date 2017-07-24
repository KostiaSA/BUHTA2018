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
import {getParamFromUrl} from "../utils/getQueryParamFromUrl";
import {SchemaHelper} from "../schema/SchemaHelper";
import {SchemaForm} from "../schema/form/SchemaForm";
import {IFormInputOptions} from "../schema/form/IFormInputOptions";
import {ValidationRule} from "antd/es/form/Form";
import {SchemaDatabase} from "../schema/database/SchemaDatabase";

let Highlighter = require("react-highlight-words");

const {Column, ColumnGroup} = Table;

export interface IPageTemplateProps {

}

export interface IRowFormPanelProps extends IFormPanelProps {
    schemaTable: SchemaTable;
    schemaForm: SchemaForm;
}


class RowFormPanel extends BaseFormPanel<IRowFormPanelProps> {
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


    renderRootFields(attrs?: any): JSX.Element[] {
        let ret: JSX.Element[] = [];
        if (this.props.schemaForm && this.props.schemaForm.props.children) {
            for (let field of this.props.schemaForm.props.children) {
                if (field.type === "field") {

                    let tableCol = this.props.schemaTable.getColumnByName(field.fieldName);
                    if (!tableCol) {
                        let msg = `в таблице '${this.props.schemaTable.props.name}' не найдена колонка '${field.fieldName}'`;
                        console.error(msg);
                        throw msg + ", " + __filename;
                    }
                    let opt: IFormInputOptions = {...tableCol.formInputOptions};
                    opt = {...opt, ...field.formInputOptions};

                    let _attrs: any = {...attrs};
                    if (!_attrs.style)
                        _attrs.style = {};

                    if (opt.maxWidth)
                        _attrs.style.maxWidth = Number.parseInt(opt.maxWidth.toString());

                    let rules: ValidationRule[] = [];

                    if (opt.required)
                        rules.push({required: true, message: opt.requiredMessage || "должно быть заполнено"});

                    ret.push(
                        <FormInput
                            {..._attrs}
                            mode={opt.mode || "input"}
                            label={opt.label || field.fieldName}
                            placeholder={opt.placeholder}
                            bindProperty={field.fieldName}
                            rules={rules}
                        />
                    )
                }
            }
        }

        return ret;
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

        return (
            <div>
                <Row>
                    <Col span={12}>

                    </Col>
                    <Col span={12}>
                        <div style={{float: "right"}}>
                            <FormSaveButton style={buttonStyle} text="Сохранить"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form layout="horizontal">
                        {this.renderRootFields(layout)}
                    </Form>

                </Row>

            </div>
        )
    }
}

const FormPanel = Form.create<IRowFormPanelProps>(RowFormPanel.formOptions)(RowFormPanel as any) as typeof RowFormPanel;


export class SchemaFormPageTemplate extends PageTemplate {


    static classInfo: IPageTemplateClassInfo = {
        className: "platform-core:SchemaFormPageTemplate",
        constructor: SchemaFormPageTemplate,
        pageTemplateName: "шаблон формы редактирования таблицы"

    };

    db: SchemaDatabase;
    form: SchemaForm;
    table: SchemaTable;
    editedObject: SchemaTableRow<any>;
    isInsertMode: boolean = false;
    initialEditedObjectProps: any;

    async loadData() {

        await super.loadData();
        console.log("load row");
        if (!this.editedObject) {
            this.form = await SchemaHelper.createSchemaObject<SchemaForm>(getParamFromUrl("formId"));
            this.table = await SchemaHelper.createSchemaObject<SchemaTable>(getParamFromUrl("tableId"));
            this.db = await SchemaHelper.createSchemaObject<SchemaDatabase>(getParamFromUrl("dbId"));

            let editedObjectId = getParamFromUrl("objectId");

            if (editedObjectId) {
                this.editedObject = await this.table.getRow(this.db.props.id, editedObjectId);
                this.initialEditedObjectProps = {...this.editedObject.props};
                //setInterval(this.trackChanges, 100);
                //this.orginalObjectPropsJson = JSON.stringify(this.designedObject.props);
            }
            else {
                this.isInsertMode = true;
                //this.editedObject = await this.createNewDesignedObject();
            }
        }
    }


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
        try {
            await this.editedObject.save(this.initialEditedObjectProps);
            this.forceUpdate();
            console.log("Запись сохранена");
            message.success("Запись сохранена");

        }
        catch (error) {
            console.error(error);
            message.error(error.toString(),4);
        }

    };


    renderChildren(): JSX.Element {
        //console.log("renderChildren - mode", this, this.isInsertMode);

        return (

            <div>
                <h2 style={{color: "green"}}>{this.table.props.name}</h2>

                <Row gutter={0}>
                    <Col className="gutter-row" span={18}>
                        <FormPanel editedObject={this.editedObject.props}
                                   schemaForm={this.form}
                                   schemaTable={this.table}
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

