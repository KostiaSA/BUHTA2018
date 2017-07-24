import {_SchemaObject} from "./_SchemaObject";
import {ISchemaObjectProps} from "../../schema/ISchemaObject";
import {SchemaDatabase} from "../../schema/database/SchemaDatabase";
import {_SchemaDatabase} from "./database/_SchemaDatabase";
import {_config} from "../../../../_config";
import {parse} from "ejson";
import {serverState} from "../ServerState";
import {SchemaTable} from "../../schema/table/SchemaTable";
import {_SchemaTable} from "./table/_SchemaTable";
import {ISchemaTableProps} from "../../schema/table/ISchemaTableProps";
import {IStringSqlDataTypeProps} from "../../schema/table/datatypes/IStringSqlDataTypeProps";
import {StringSqlDataType} from "../../schema/table/datatypes/StringSqlDataType";
import {FkSqlDataType} from "../../schema/table/datatypes/FkSqlDataType";
import {IFkSqlDataTypeProps} from "../../schema/table/datatypes/IFkSqlDataTypeProps";
import {_getSchemaObjectTable} from "./_getSchemaObjectTable";
import {_getSchemaDatabase} from "./_getSchemaDatabase";
import {CoreConst} from "../../CoreConst";

export async function _loadSchemaObject<T extends _SchemaObject<ISchemaObjectProps>>(id: string): Promise<T> {

    if (id === SchemaDatabase.classInfo.recordIdPrefix + ":" + CoreConst.Schema_DatabaseId) {
        let obj = new _SchemaDatabase();
        obj.props = {
            id: id,
            name: "schema",
            className: SchemaDatabase.classInfo.className,
            description: "",
            sqlDialect: _config.sqlDialect,
            sqlServerAddress: _config.sqlServerAddress,
            sqlServerInstance: _config.sqlServerInstance,
            sqlServerPort: _config.sqlServerPort,
            sqlDatabase: _config.sqlDatabase,
            sqlLogin: _config.sqlLogin,
            sqlPassword: _config.sqlPassword,
        };

        // todo странное any ???
        return obj as any;
    }
    else {
        if (id === SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaTable_TableId) {

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
                        dataType: {
                            className: FkSqlDataType.classInfo.className,
                            fkTableId: _SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaObjectTypeTableObjectId
                        } as IFkSqlDataTypeProps

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

            // todo странное any ???
            return table as any;
        }
        else {
            console.log("load 1",id);

            let table = await _getSchemaObjectTable();
            console.log("load 1.5",id);
            let db = await _getSchemaDatabase();
            console.log("load 2");

            let row = await db.selectTableRow(table, id, ["jsonData"]);
            console.log("load 3");

            if (row) {
                let props = parse(row.jsonData) as ISchemaObjectProps;
                let objectClass = serverState.getRegisteredClassInfo(props.className).constructor;
                let obj = new objectClass();
                obj.props = props;
                return obj;
            }
            else
                throw "Ошибка загрузки _SchemaObject (id:" + id + "): запись не найдена";
        }
    }

}