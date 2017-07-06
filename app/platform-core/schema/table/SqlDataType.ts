import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {ISqlDataTypeProps} from "./ISqlDataTypeProps";
import {appState} from "../../AppState";

export class SqlDataType<P extends ISqlDataTypeProps> {
    static className = "?";
    props: P;

    static renderEditor(attrs?: any): JSX.Element | JSX.Element[] {
        return null as any;
    }

    dataTypeUserFriendly(): string | JSX.Element {
        return null as any;
    }
}


export function createSqlDataTypeObject(props: ISqlDataTypeProps): SqlDataType<ISqlDataTypeProps> {
    let objectClass = appState.getRegisteredSqlDataType(props.className);
    let obj = new (objectClass as any)();
    obj.props = props;
    return obj;
}