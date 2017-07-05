import * as React from "react";
import {SqlDataType} from "./SqlDataType";
import {IIntegerSqlDataTypeProps} from "./IIntegerSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";

export class IntegerSqlDataType extends SqlDataType<IIntegerSqlDataTypeProps> {
    static className = "integer";

    static renderEditor(attrs?: any): JSX.Element | JSX.Element[] {
        return [
            <FormInput
                {...attrs}
                mode="radio"
                label="размер"
                bindProperty="size"
                defaultValue="32"
                selectValues={[["8", "8 bit"], ["16", "16 bit"], ["32", "32 bit"], ["64", "64 bit"]]}
            />,
            <FormInput
                {...attrs}
                mode="checkbox"
                label="unsigned (без знака, 0..max)"
                defaultValue={false}
                bindProperty="unsigned"
            />
        ]
    }

}