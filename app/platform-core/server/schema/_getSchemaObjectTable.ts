import {_ISqlTable} from "./database/_SqlTable";
import {_loadSchemaObject} from "./_loadSchemaObject";
import {CoreConst} from "../../CoreConst";
import {_SchemaTable} from "./table/_SchemaTable";
import {ISchemaTableProps} from "../../schema/table/ISchemaTableProps";
import {StringSqlDataType} from "../../schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../../schema/table/datatypes/IStringSqlDataTypeProps";

export async function _getSchemaObjectTable(): Promise<_ISqlTable> {
    // let schemaObjectTable = await _loadSchemaObject<_SchemaTable>(SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaTable_TableId);
    // return schemaObjectTable.getSqlTable();

    let tableProps: ISchemaTableProps = {
        id: _SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaTable_TableId,
        className: _SchemaTable.classInfo.className,
        name: "__SchemaObject__",
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
                // dataType: {
                //     className: FkSqlDataType.classInfo.className,
                //     fkTableId: _SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaObjectTypeTableObjectId
                // } as IFkSqlDataTypeProps
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
    return await table.getSqlTable();

}