import {TableDataSourceHelper} from "../../utils/TableDataSourceHelper";
import {ISchemaQueryColumnProps} from "./ISchemaQueryColumnProps";
import {objectAssign} from "mobx/lib/utils/utils";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {getRandomString} from "../../utils/getRandomString";


export class SchemaQueryColumn {
    query: ISchemaQueryProps;
    props: ISchemaQueryColumnProps;
    parent: SchemaQueryColumn;
    columns: SchemaQueryColumn[] = [];

    // getParentTableName(): string {
    //     if (!this.parent) {
    //         return "";
    //
    //     }
    //     else {
    //         return this.parent.getParentFullName()+"."+ this.props.fieldSource!;
    //     }
    // }
}

export class SchemaQueryHelper {
    constructor(public query: ISchemaQueryProps) {
        this.createTree();
    }

    root: SchemaQueryColumn;
    columnsByKey: { [key: string]: SchemaQueryColumn; } = {};


    private iterateNodeRecursive(node: ISchemaQueryColumnProps, parent?: ISchemaQueryColumnProps, parentColumn?: SchemaQueryColumn) {

        let column = new SchemaQueryColumn();
        column.props = node;
        column.query = this.query;

        if (!node.key)
            node.key = getRandomString();

        this.columnsByKey[node.key] = column;

        if (parentColumn) {
            column.parent = parentColumn;
            parentColumn.columns.push(column)
        }
        else {
            this.root = column;
        }

        if (node.children) {
            node.children.forEach((_node: ISchemaQueryColumnProps) => {
                this.iterateNodeRecursive(_node, node, column);
            });

        }
    }

    private createTree() {
        if (!this.query.children || this.query.children.length === 0) {
            return;
        }

        if (this.query.children.length > 1) {
            let msg = "корневой элемент (children[]) должен быть один";
            console.error(msg);
            throw  msg + ", " + __filename;
        }

        this.iterateNodeRecursive(this.query.children[0]);
        console.log("-- root----", this.root);

    }

    getColumn(key: string): SchemaQueryColumn {
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