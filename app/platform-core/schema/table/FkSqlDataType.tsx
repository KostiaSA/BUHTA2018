import * as React from "react";

import {SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";
import {LazyLoad} from "../../components/LazyLoad";
import {IFkSqlDataTypeProps} from "./IFkSqlDataTypeProps";
import {createSchemaObject} from "../SchemaObject";
import {SchemaTable} from "./SchemaTable";
import {sleep} from "../../utils/sleep";

export class FkSqlDataType extends SqlDataType<IFkSqlDataTypeProps> {
    static className = "fk";

    static renderEditor(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] {
        return (
            <FormInput
                {...attrs}
                mode="input"
                label="ссылка на таблицу"
                bindProperty="dataType.fkTableId"
                style={{maxWidth: 400}}
                rules={[{required: true, message: "таблица должнена быть заполнена"}]}
            />
        )
    }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {

        let cache=parentReactComp as any;
        //let cache:any={};

        return (
            <LazyLoad
                parent={parentReactComp}
                loadParams={this.props.fkTableId}
                onLoad={async () => {
                    try {
                        delete cache.__fkTableName__;
                        let table = await createSchemaObject<SchemaTable>(this.props.fkTableId);
                        cache.__fkTableName__ = table.props.name;
                    }
                    catch (e) {
                        throw  "fk => ошибка:" + this.props.fkTableId;
                    }
                }}
            >
                <span
                    style={{color: "goldenrod "}}>{"FK => " + cache.__fkTableName__}
                </span>
            </LazyLoad>

        );
    }


}