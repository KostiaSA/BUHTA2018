import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {appState} from "../../AppState";
import {isString} from "util";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaPage} from "../SchemaPage";
import {ISchemaTableRow} from "./SchemaTableRow";
import {CoreConst} from "../../CoreConst";


export interface ISchemaTableClassInfo extends ISchemaObjectClassInfo<typeof SchemaTable> {

}

export class SchemaTable extends SchemaObject<ISchemaTableProps> implements ISchemaTableRow {

    static classInfo: ISchemaTableClassInfo = {
        title: "Таблица",
        description: "Sql - таблица",
        className: "platform-core:SchemaTable",
        constructor: SchemaTable,
        recordIdPrefix: "schema-table",
    };

    async openChangeRecordPage(recordId: string): Promise<void> {

        if (SchemaTable.classInfo.editOptions && SchemaTable.classInfo.editOptions.editPageId) {
            let page = await SchemaHelper.createSchemaObject<SchemaPage>(SchemaTable.classInfo.editOptions.editPageId);
            page.openInNewTab({objectId: recordId});
        }
        else {
            let msg = "openChangeRecordPage для SchemaTable";
            console.error(msg);
            throw msg + ", " + __filename;
        }
    }

    async handleChangeRecordClick(recordId: any) {
        console.log("handleChangeRecordClick(recordId: any)", recordId, this.props);
        if (isString(recordId)) {

            let classInfo = appState.getRegisteredClassInfoByPrefix(recordId);

            if (classInfo) {
                let objClass = classInfo.constructor;
                if (objClass) {
                    let obj = new objClass() as ISchemaTableRow;
                    if (obj.openChangeRecordPage) {
                        obj.openChangeRecordPage(recordId);
                    }
                    else {
                        alert("ошибка вызова редактора 555");

                    }
                }
                else {
                    alert("ошибка вызова редактора 333");

                }
            }
            else {
                alert("ошибка вызова редактора 000");
            }

        }
        else {
            let pageId: string;
            if (this.props.editOptions && this.props.editOptions.editPageId)
                pageId = this.props.editOptions.editPageId;
            else
                pageId = SchemaPage.classInfo.recordIdPrefix + ":" + CoreConst.FormPageObjectId;
            let editPpage = await SchemaHelper.createSchemaObject<SchemaPage>(pageId);


            let formId: string = undefined as any;
            if (this.props.editOptions && this.props.editOptions.editFormId)
                formId = this.props.editOptions.editFormId;

            let params: any = {objectId: recordId, tableId: this.props.id};
            if (formId)
                params.formId = formId;

            editPpage.openInNewTab(params);

            // if (this.props.editOptions) {
            //     if (this.props.editOptions.editPageId) {
            //
            //         let editPpage = await SchemaHelper.createSchemaObject<SchemaPage>(this.props.editOptions.editPageId);
            //
            //         let params: any = {objectId: recordId};
            //         if (this.props.editOptions.editFormId)
            //             params.formId = this.props.editOptions.editFormId;
            //
            //         editPpage.openInNewTab(params);
            //     }
            //     else
            //         alert("ошибка вызова редактора 111");
            // }
            // else {
            //     alert("вызов стандартного редактора");
            //     let editPpage = await SchemaHelper.createSchemaObject<SchemaPage>(SchemaPage.classInfo.recordIdPrefix + ":" + CoreConst.FormPageObjectId);
            //     editPpage.openInNewTab({objectId: recordId});
            // }

        }

    }

    async handleAddRecordClick() {

        if (this.props.editOptions) {
            if (this.props.editOptions.addPageId) {
                let editPpage = await SchemaHelper.createSchemaObject<SchemaPage>(this.props.editOptions.addPageId);
                editPpage.openInNewTab();
            }
            else
                alert("ошибка вызова редактора 999");
        }
        else {
            alert("вызов стандартного редактора 999-00");
        }


    }
}