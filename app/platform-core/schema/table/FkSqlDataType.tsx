import * as React from "react";

import {SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";

export class StringSqlDataType extends SqlDataType<IStringSqlDataTypeProps> {
    static className = "fk";

    static renderEditor(columnProps:ISchemaTableColumnProps, attrs?: any ): JSX.Element | JSX.Element[] {
        return (
            <FormInput
                {...attrs}
                mode="input"
                label="Ссылка на таблицу"
                bindProperty="dataType.fkTableId"
                style={{maxWidth: 300}}
                tooltip="????-ноль или пустое значение означает максимальную длину.."
                rules={[{required: true, message: "fk таблица должнена быть заполнена"}]}
            />
        )
    }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {
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