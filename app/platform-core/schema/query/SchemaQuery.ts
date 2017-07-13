import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {executeSchemaQueryApiRequest} from "../api/executeSchemaQueryApiRequest";
import {appState} from "../../AppState";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaTable} from "../table/SchemaTable";
import {ISchemaTableRow} from "../table/SchemaTableRow";
import {SchemaPage} from "../SchemaPage";
import {getRandomString} from "../../utils/getRandomString";
import {ISchemaQueryColumnProps} from "./ISchemaQueryColumnProps";


export interface ISchemaQueryClassInfo extends ISchemaObjectClassInfo<typeof SchemaQuery> {

}

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> implements ISchemaTableRow {

    static classInfo: ISchemaQueryClassInfo = {
        title: "Запрос",
        className: "platform-core:SchemaQuery",
        constructor: SchemaQuery,
        //designerUrl: "+++++++++++++++admin/schema-query-designer",
        recordIdPrefix: "schema-query"
    };

    iterateNodeRecursive(node: ISchemaQueryColumnProps, parent?: ISchemaQueryColumnProps, callback?: (node: ISchemaQueryColumnProps, parent?: ISchemaQueryColumnProps) => void) {

        callback && callback(node, parent);

        if (!node.key)
            node.key = getRandomString();

        if (node.children) {
            for (let _node of node.children) {
                this.iterateNodeRecursive(_node, node, callback);
            }
        }
    }

    getParentNode(node: ISchemaQueryColumnProps): ISchemaQueryColumnProps | undefined {
        let parent: ISchemaQueryColumnProps;
        this.iterateNodeRecursive(this.props, undefined, (_node: ISchemaQueryColumnProps, _parent?: ISchemaQueryColumnProps) => {
            if (_node === node)
                parent = _parent!;
        });
        return parent!;
    }

    deleteColumn(node: ISchemaQueryColumnProps) {
        let parent = this.getParentNode(node);
        if (parent) {
            parent.children!.splice(parent.children!.indexOf(node), 1);
        }
    }


    async loadData(): Promise<any[]> {
        return (await executeSchemaQueryApiRequest({queryId: this.props.id})).rows;
    }

    async getRootTable(): Promise<SchemaTable> {
        let tableId = this.props.tableId;
        let schemaTable = await SchemaHelper.createSchemaObject<SchemaTable>(tableId!);
        return schemaTable;
    }

    async openChangeRecordPage(recordId: string): Promise<void> {

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