import * as React from "react";
import {SqlDataType} from "./SqlDataType";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";

export class IntegerSqlDataType extends SqlDataType<IIntegerSqlDataTypeProps> {
    static className = "integer";

    static renderEditor(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] {
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
            />
        ]
    }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {
        return (
            <span
                style={{color: "teal"}}>{(this.props.unsigned ? "u" : "") + "int" + this.props.size}
            </span>
        );

    }

}