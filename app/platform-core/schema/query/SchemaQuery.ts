import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {executeSchemaQueryApiRequest} from "../api/executeSchemaQueryApiRequest";
import {appState} from "../../AppState";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaTable} from "../table/SchemaTable";
import {ISchemaTableRow} from "../table/SchemaTableRow";
import {SchemaPage} from "../SchemaPage";


export interface ISchemaQueryClassInfo extends ISchemaObjectClassInfo<typeof SchemaQuery> {

}

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> implements ISchemaTableRow{

    static classInfo: ISchemaQueryClassInfo = {
        title:"Запрос",
        className: "platform-core:SchemaQuery",
        constructor: SchemaQuery,
        //designerUrl: "+++++++++++++++admin/schema-query-designer",
        recordIdPrefix:"schema-query"
    };

    async loadData(): Promise<any[]> {
        return (await executeSchemaQueryApiRequest({queryId: this.props.id})).rows;
    }

    async getRootTable(): Promise<SchemaTable> {
        let tableId=this.props.tableId;
        let schemaTable = await SchemaHelper.createSchemaObject<SchemaTable>(tableId!);
        return schemaTable;
    }

    async openChangeRecordPage(recordId: string):Promise<void> {

        if (SchemaQuery.classInfo.editOptions && SchemaQuery.classInfo.editOptions.editPageId) {
            let page = await SchemaHelper.createSchemaObject<SchemaPage>(SchemaQuery.classInfo.editOptions.editPageId);
            page.openInNewTab({objectId: recordId});
        }
        else {
            let msg = "openChangeRecordPage для SchemaQuery";
            console.error(msg);
            throw msg + ", " + __filename;
        }
    }


    async handleChangeRecordClick(recordId: string) {
        let rootTable = await this.getRootTable();
        rootTable.handleChangeRecordClick(recordId)
    }
}