import * as React from "react";
import {ISchemaObjectProps} from "../../ISchemaObject";
import {SchemaObject} from "../../SchemaObject";
import {ISchemaTableProps} from "../ISchemaTableProps";
import {ISqlDataTypeProps} from "./ISqlDataTypeProps";
import {appState} from "../../../AppState";
import {ISchemaTableColumnProps} from "../ISchemaTableColumnProps";
import {IClassInfo} from "../../../IClassInfo";

export type SqlDialect = "mysql" | "postgres" | "mssql";

export interface ISqlDataTypeClassInfo extends IClassInfo<typeof SqlDataType> {
    title: string;
    renderEditor: (columnProps: ISchemaTableColumnProps, attrs?: any) => JSX.Element | JSX.Element[];
}


export class SqlDataType<P extends ISqlDataTypeProps> {
    //static className = "?SqlDataType?";
    props: P;

    // static renderEditor(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] {
    //     return null as any;
    // }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {
        return null as any;
    }

}


export function createSqlDataTypeObject(props: ISqlDataTypeProps): SqlDataType<ISqlDataTypeProps> {
    let objectClass = appState.getRegisteredClassInfo(props.className).constructor;
    let obj = new objectClass();
    obj.props = props;
    return obj;
}