import * as React from "react";

import {SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";

export class StringSqlDataType extends SqlDataType<IStringSqlDataTypeProps> {
    static className = "string";

    static renderEditor(attrs?: any): JSX.Element | JSX.Element[] {
        return (
            <FormInput
                {...attrs}
                mode="input"
                label="длина"
                bindProperty="maxLen"
                defaultValue="50"
                style={{maxWidth: 100}}
                tooltip="ноль или пустое значение означает максимальную длину"
                rules={[{required: true, message: "тип данных должнен быть заполнен"}]}
            />
        )
    }

}