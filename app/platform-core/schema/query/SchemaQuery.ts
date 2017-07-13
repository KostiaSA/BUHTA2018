import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {executeSchemaQueryApiRequest} from "../api/executeSchemaQueryApiRequest";
import {appState} from "../../AppState";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaTable} from "../table/SchemaTable";


export interface ISchemaQueryClassInfo extends ISchemaObjectClassInfo<typeof SchemaQuery> {

}

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> {

    static classInfo: ISchemaQueryClassInfo = {
        className: "platform-core:SchemaQuery",
        constructor: SchemaQuery,
        designerUrl: "admin/schema-query-designer",
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

    async handleChangeRecordClick(recordId: string) {
        let rootTable = await this.getRootTable();
        rootTable.handleChangeRecordClick(recordId)
    }
}