import * as React from "react";
import {ISqlDataTypeClassInfo, SqlDataType} from "./SqlDataType";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";
import {FormInput} from "../../../components/FormInput";
import {ISchemaTableColumnProps} from "../ISchemaTableColumnProps";

export class IntegerSqlDataType extends SqlDataType<IIntegerSqlDataTypeProps> {

    static classInfo: ISqlDataTypeClassInfo = {
        className: "platform-core:IntegerSqlDataType",
        constructor: IntegerSqlDataType,
        title: "целое",
        renderEditor: (columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] => {
            return [
                <FormInput
                    {...attrs}
                    mode="radio"
                    label="размер"
                    bindProperty="dataType.size"
                    defaultValue="32"
                    selectValues={[["8", "8 bit"], ["16", "16 bit"], ["32", "32 bit"], ["64", "64 bit"]]}
                />,
                <FormInput
                    {...attrs}
                    mode="checkbox"
                    label="unsigned (без знака, 0..max)"
                    defaultValue={false}
                    bindProperty="dataType.unsigned"
                />,
                <FormInput
                    {...attrs}
                    mode="checkbox"
                    label="auto increment"
                    defaultValue={false}
                    bindProperty="dataType.autoIncrement"
                />
            ]
        }
    };


    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {
        return (
            <span
                style={{color: "teal"}}>{(this.props.unsigned ? "+" : "") + "целое" + this.props.size + (this.props.autoIncrement ? ", autoInc" : "")}
            </span>
        );

    }

}