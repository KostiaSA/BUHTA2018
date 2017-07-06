import * as React from "react";

import {SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";

export class StringSqlDataType extends SqlDataType<IStringSqlDataTypeProps> {
    static className = "string";

    static renderEditor(columnProps:ISchemaTableColumnProps, attrs?: any ): JSX.Element | JSX.Element[] {
        return (
            <FormInput
                {...attrs}
                mode="input"
                label="длина"
                bindProperty="dataType.maxLen"
                defaultValue="50"
                style={{maxWidth: 100}}
                tooltip="ноль или пустое значение означает максимальную длину.."
                rules={[{required: true, message: "тип данных должнен быть заполнен"}]}
            />
        )
    }

    dataTypeUserFriendly(): string | JSX.Element {
        if (!this.props.maxLen || this.props.maxLen === 0)
            return StringSqlDataType.className;
        else
            return (
                <span
                    style={{color: "indianred"}}>{StringSqlDataType.className + "(" + this.props.maxLen + ")"}
                </span>
            );
    }


}