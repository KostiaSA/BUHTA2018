import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {ISqlDataTypeProps} from "./ISqlDataTypeProps";
import {appState} from "../../AppState";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";

export class SqlDataType<P extends ISqlDataTypeProps> {
    static className = "?SqlDataType?";
    props: P;

    static renderEditor(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] {
        return null as any;
    }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {
        return null as any;
    }

}


export function createSqlDataTypeObject(props: ISqlDataTypeProps): SqlDataType<ISqlDataTypeProps> {
    let objectClass = appState.getRegisteredSqlDataType(props.className);
    let obj = new (objectClass as any)();
    obj.props = props;
    return obj;
}