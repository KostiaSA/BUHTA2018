import {SchemaTable} from "../table/SchemaTable";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {ISchemaQueryColumnProps} from "./ISchemaQueryColumnProps";
import {getRandomString} from "../../utils/getRandomString";


export class SchemaQueryHelperColumn {
    query: ISchemaQueryProps;
    props: ISchemaQueryColumnProps;
    parent: SchemaQueryHelperColumn;
    columns: SchemaQueryHelperColumn[] = [];
    joinTable: SchemaTable;

    get joinTableAlias(): string {
        if (this.parent)
            return this.parent.joinTableAlias + "." + this.joinTable.props.name;
        else
            return this.joinTable.props.name;
    }
}

export class SchemaQueryHelper {
    constructor(public query: ISchemaQueryProps) {

    }

    root: SchemaQueryHelperColumn;
    columns: SchemaQueryHelperColumn[] = [];
    columnsByKey: { [key: string]: SchemaQueryHelperColumn; } = {};


    private async iterateNodeRecursive(node: ISchemaQueryColumnProps, parent?: ISchemaQueryColumnProps, parentColumn?: SchemaQueryHelperColumn) {

        let column = new SchemaQueryHelperColumn();
        column.props = node;
        column.query = this.query;

        if (!node.key)
            node.key = getRandomString();

        this.columns.push(column);
        this.columnsByKey[node.key] = column;

        // if (column.props.tableId) {
        //     column.joinTable = await _loadSchemaObject<_SchemaTable>(column.props.tableId);
        // }

        if (parentColumn) {
            column.parent = parentColumn;
            parentColumn.columns.push(column)
        }
        else {
            this.root = column;
        }

        if (node.children) {
            for (let _node of node.children) {
                await this.iterateNodeRecursive(_node, node, column);
            }
        }
    }

    async createTree() {
        await this.iterateNodeRecursive(this.query);
        //console.log("-- root----", this.root);

    }

    getColumn(key: string): SchemaQueryHelperColumn {
        let ret = this.columnsByKey[key];
        if (!this.columnsByKey[key]) {
            let msg = "не найдена колонка, key:" + key;
            console.error(msg);
            throw msg + ", " + __filename;
        }
        else
            return ret;

    }


}