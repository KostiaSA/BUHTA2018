import {ISchemaQueryColumnProps} from "../../../schema/query/ISchemaQueryColumnProps";
import {ISchemaQueryProps} from "../../../schema/query/ISchemaQueryProps";
import {getRandomString} from "../../../utils/getRandomString";
import {_SchemaTable} from "../table/_SchemaTable";
import {_loadSchemaObject} from "../_loadSchemaObject";


export class _SchemaQueryHelperColumn {
    query: ISchemaQueryProps;
    props: ISchemaQueryColumnProps;
    parent: _SchemaQueryHelperColumn;
    columns: _SchemaQueryHelperColumn[] = [];
    joinTable: _SchemaTable;

    get joinTableAlias(): string {
        if (this.parent)
            return this.parent.joinTableAlias + "." + this.joinTable.props.name;
        else
            return this.joinTable.props.name;
    }
}

export class _SchemaQueryHelper {
    constructor(public query: ISchemaQueryProps) {

    }

    root: _SchemaQueryHelperColumn;
    columnsByKey: { [key: string]: _SchemaQueryHelperColumn; } = {};


    private async iterateNodeRecursive(node: ISchemaQueryColumnProps, parent?: ISchemaQueryColumnProps, parentColumn?: _SchemaQueryHelperColumn) {

        let column = new _SchemaQueryHelperColumn();
        column.props = node;
        column.query = this.query;

        if (!node.key)
            node.key = getRandomString();

        this.columnsByKey[node.key] = column;

        if (column.props.tableId) {
            column.joinTable = await _loadSchemaObject<_SchemaTable>(column.props.tableId);
        }

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

    getColumn(key: string): _SchemaQueryHelperColumn {
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