import {ISchemaObjectProps} from "../ISchemaObject";
import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {appState} from "../../AppState";
import {isString} from "util";
import {SchemaQueryHelper} from "../query/SchemaQueryHelper";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaPage} from "../SchemaPage";
import {ISchemaTableRow} from "./SchemaTableRow";


export interface ISchemaTableClassInfo extends ISchemaObjectClassInfo<typeof SchemaTable> {

}

export class SchemaTable extends SchemaObject<ISchemaTableProps> implements ISchemaTableRow {
    //static className="platform-core:SchemaTable";
    //static designerUrl="admin/schema-table-designer";

    static classInfo: ISchemaTableClassInfo = {
        className: "platform-core:SchemaTable",
        constructor: SchemaTable,
        //designerUrl: "+++++++++++admin/schema-table-designer",
        recordIdPrefix: "schema-table",
    };

    async openChangeRecordPage(recordId: string):Promise<void> {

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
            // let editOptions = {...this.props.editOptions,};
            // console.log("---this.props.editOptions---", recordId, classInfo);

        }
        else {
            if (this.props.editOptions) {
                if (this.props.editOptions.editPageId) {

                    let editPpage = await SchemaHelper.createSchemaObject<SchemaPage>(this.props.editOptions.editPageId);


                    editPpage.openInNewTab({objectId: recordId});
                }
                else
                    alert("ошибка вызова редактора 111");
            }
            else {
                alert("вызов стандартного редактора");
            }

        }

    }


}