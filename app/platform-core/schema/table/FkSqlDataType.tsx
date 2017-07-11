import * as React from "react";

import {ISqlDataTypeClassInfo, SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";
import {FormInput} from "../../components/FormInput";
import {ISchemaTableColumnProps} from "./ISchemaTableColumnProps";
import {IFkSqlDataTypeProps} from "./IFkSqlDataTypeProps";
import {SchemaTable} from "./SchemaTable";
import {sleep} from "../../utils/sleep";
import {LazyRender} from "../../components/LazyRender";
import {findSchemaObjectsApiRequest} from "../api/findSchemaObjectsApiRequest";
import {findSchemaObjectsForLookupApiRequest} from "../api/findSchemaObjectsForLookupApiRequest";
import {SchemaHelper} from "../SchemaHelper";

export class FkSqlDataType extends SqlDataType<IFkSqlDataTypeProps> {

    static classInfo: ISqlDataTypeClassInfo = {
        className: "platform-core:FkSqlDataType",
        constructor: FkSqlDataType,
        title: "ссылка",
        renderEditor:(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] => {
            return [
                <LazyRender
                    params={{}}
                    render={async () => {

                        let ans = await findSchemaObjectsForLookupApiRequest({where: {type: "SchemaTable"}});
                        let values = ans.objects.map((table: any) => {
                            return {value: table.id, text: table.name}
                        });

                        return (
                            <FormInput
                                {...attrs}
                                mode="lookup"
                                label="ссылка на таблицу"
                                bindProperty="dataType.fkTableId"
                                style={{maxWidth: 400}}
                                selectValues={values}
                                rules={[{required: true, message: "таблица должнена быть заполнена"}]}
                            />
                        )
                    }}
                >
                </LazyRender>
            ]
        }
    };

    // static renderEditor(columnProps: ISchemaTableColumnProps, attrs?: any): JSX.Element | JSX.Element[] {
    //     return (
    //         <LazyRender
    //             params={{}}
    //             render={async () => {
    //
    //                 let ans = await findSchemaObjectsForLookupApiRequest({where: {type: "SchemaTable"}});
    //                 let values = ans.objects.map((table: any) => {
    //                     return {value: table.id, text: table.name}
    //                 });
    //
    //                 return (
    //                     <FormInput
    //                         {...attrs}
    //                         mode="lookup"
    //                         label="ссылка на таблицу"
    //                         bindProperty="dataType.fkTableId"
    //                         style={{maxWidth: 400}}
    //                         selectValues={values}
    //                         rules={[{required: true, message: "таблица должнена быть заполнена"}]}
    //                     />
    //                 )
    //             }}
    //         >
    //         </LazyRender>
    //     )
    // }

    dataTypeUserFriendly(parentReactComp: React.Component<any, any>): string | JSX.Element {

        // let cache = parentReactComp as any;
        //let cache:any={};

        // return (
        //     <LazyLoad
        //         parent={parentReactComp}
        //         loadParams={this.props.fkTableId}
        //         onLoad={async () => {
        //             try {
        //                 delete cache.__fkTableName__;
        //                 let table = await createSchemaObject<SchemaTable>(this.props.fkTableId);
        //                 cache.__fkTableName__ = table.props.name;
        //             }
        //             catch (e) {
        //                 throw  "fk => ошибка:" + this.props.fkTableId;
        //             }
        //         }}
        //     >
        //         <span
        //             style={{color: "goldenrod "}}>{"FK => " + cache.__fkTableName__}
        //         </span>
        //     </LazyLoad>
        //
        // );

        return (
            <LazyRender
                params={this.props.fkTableId}
                render={async () => {
                    try {
                        let table = await SchemaHelper.createSchemaObject<SchemaTable>(this.props.fkTableId);
                        return (
                            <span
                                style={{color: "goldenrod "}}>{"ссылка => " + table.props.name}
                            </span>
                        )
                    }
                    catch (e) {
                        throw  "ссылка => ошибка:" + this.props.fkTableId;
                    }
                }}
            >
            </LazyRender>

        );

    }


}