import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaMenuProps} from "../Menu/ISchemaMenuProps";
import {getRandomString} from "../../utils/getRandomString";
import {ISchemaMenuItemProps} from "../Menu/ISchemaMenuItemProps";


export interface ISchemaMenuClassInfo extends ISchemaObjectClassInfo<typeof SchemaMenu> {

}

export class SchemaMenu extends SchemaObject<ISchemaMenuProps> {

    static classInfo: ISchemaMenuClassInfo = {
        title: "Меню",
        description: "Меню",
        className: "platform-core:SchemaMenu",
        constructor: SchemaMenu,
        recordIdPrefix: "schema-menu"
    };

    iterateNodeRecursive(node: ISchemaMenuItemProps, parent?: ISchemaMenuItemProps, callback?: (node: ISchemaMenuItemProps, parent?: ISchemaMenuItemProps) => void) {

        callback && callback(node, parent);

        if (!node.key)
            node.key = getRandomString();

        if (node.children) {
            for (let _node of node.children) {
                this.iterateNodeRecursive(_node, node, callback);
            }
        }
    }

    getParentNode(node: ISchemaMenuItemProps): ISchemaMenuItemProps | undefined {
        let parent: ISchemaMenuItemProps;
        this.iterateNodeRecursive(this.props, undefined, (_node: ISchemaMenuItemProps, _parent?: ISchemaMenuItemProps) => {
            if (_node === node)
                parent = _parent!;
        });
        return parent!;
    }


    deleteItem(node: ISchemaMenuItemProps) {
        let parent = this.getParentNode(node);
        if (parent) {
            parent.children!.splice(parent.children!.indexOf(node), 1);
        }
    }



}