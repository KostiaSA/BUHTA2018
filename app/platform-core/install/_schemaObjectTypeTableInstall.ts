import {ISchemaTableProps} from "../schema/table/ISchemaTableProps";
import {_SchemaTable} from "../server/schema/table/_SchemaTable";
import {StringSqlDataType} from "../schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../schema/table/datatypes/IStringSqlDataTypeProps";
import {CoreConst} from "../CoreConst";
import {IFkSqlDataTypeProps} from "../schema/table/datatypes/IFkSqlDataTypeProps";
import {FkSqlDataType} from "../schema/table/datatypes/FkSqlDataType";

export async function _schemaObjectTypeTableInstall() {


    // ------------------ SchemaTable типы объектов конфигурации ------------------
    let tableProps: ISchemaTableProps = {
        id: _SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaObjectTypeTableObjectId,
        className: _SchemaTable.classInfo.className,
        name: "__SchemaObjectType__",
        description: "типы объектов конфигурации",
        columns: [
            {
                name: "objectClassName",
                primaryKey: true,
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 127
                } as IStringSqlDataTypeProps

            },
            {
                name: "title",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 127
                } as IStringSqlDataTypeProps

            },
            {
                name: "prefix",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 32
                } as IStringSqlDataTypeProps

            },
        ]
    };

    let table = new _SchemaTable(tableProps);

    try {
        await table.save();
        await table.sync();
        console.log("создана таблица '" + tableProps.name + "'", tableProps);

    }
    catch (error) {
        console.error(error);
    }

}
