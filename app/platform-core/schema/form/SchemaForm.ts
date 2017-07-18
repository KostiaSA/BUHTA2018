import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaFormProps} from "./ISchemaFormProps";
import {SchemaHelper} from "../SchemaHelper";
import {SchemaTable} from "../table/SchemaTable";
import {ISchemaTableRow} from "../table/SchemaTableRow";
import {SchemaPage} from "../SchemaPage";
import {getRandomString} from "../../utils/getRandomString";
import {ISchemaFormFieldProps} from "./ISchemaFormFieldProps";


export interface ISchemaFormClassInfo extends ISchemaObjectClassInfo<typeof SchemaForm> {

}

export class SchemaForm extends SchemaObject<ISchemaFormProps> {

    static classInfo: ISchemaFormClassInfo = {
        title: "Форма",
        description: "Форма для редактирования таблицы",
        className: "platform-core:SchemaForm",
        constructor: SchemaForm,
        recordIdPrefix: "schema-form"
    };

    iterateNodeRecursive(node: ISchemaFormFieldProps, parent?: ISchemaFormFieldProps, callback?: (node: ISchemaFormFieldProps, parent?: ISchemaFormFieldProps) => void) {

        callback && callback(node, parent);

        if (!node.key)
            node.key = getRandomString();

        if (node.children) {
            for (let _node of node.children) {
                this.iterateNodeRecursive(_node, node, callback);
            }
        }
    }

    getParentNode(node: ISchemaFormFieldProps): ISchemaFormFieldProps | undefined {
        let parent: ISchemaFormFieldProps;
        this.iterateNodeRecursive(this.props, undefined, (_node: ISchemaFormFieldProps, _parent?: ISchemaFormFieldProps) => {
            if (_node === node)
                parent = _parent!;
        });
        return parent!;
    }

    deleteColumn(node: ISchemaFormFieldProps) {
        let parent = this.getParentNode(node);
        if (parent) {
            parent.children!.splice(parent.children!.indexOf(node), 1);
        }
    }


    async getRootTable(): Promise<SchemaTable> {
        let tableId = this.props.tableId;
        let schemaTable = await SchemaHelper.createSchemaObject<SchemaTable>(tableId!);
        return schemaTable;
    }

}