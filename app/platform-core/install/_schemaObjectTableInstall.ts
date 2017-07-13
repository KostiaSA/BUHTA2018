
import {ISchemaTableProps} from "../schema/table/ISchemaTableProps";
import {_SchemaTable} from "../server/schema/table/_SchemaTable";
import {StringSqlDataType} from "../schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../schema/table/datatypes/IStringSqlDataTypeProps";
import {CoreConst} from "../CoreConst";

export async function _schemaObjectTableInstall() {


    // ------------------ SchemaTable организация ------------------
    let tableProps: ISchemaTableProps = {
        id: _SchemaTable.classInfo.recordIdPrefix+":"+CoreConst.SchemaTableObjectId,
        className: _SchemaTable.classInfo.className,
        name: "SchemaObject",
        description: "объекты конфигурации",
        columns: [
            {
                name: "id",
                primaryKey: true,
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 127
                } as IStringSqlDataTypeProps

            },
            {
                name: "name",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 127
                } as IStringSqlDataTypeProps

            },
            {
                name: "description",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 1000
                } as IStringSqlDataTypeProps

            },
            {
                name: "className",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 127
                } as IStringSqlDataTypeProps

            },
            {
                name: "jsonData",
                dataType: {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: 0
                } as IStringSqlDataTypeProps

            },
        ]
    };

    let table = new _SchemaTable(tableProps);

    try {
        await table.save();
        await table.sync();
        console.log("создана таблица '" + tableProps.name + "'",tableProps);

    }
    catch (error) {
        console.error(error);
    }

}
