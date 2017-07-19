import {_buhta3Sequelize, _buhta3SequelizeInit} from "../_buhta3Sequelize";
import {_sequelizeInit} from "../../platform-core/server/_sequelize";
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {StringSqlDataType} from "../../platform-core/schema/table/datatypes/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IStringSqlDataTypeProps";
import {IntegerSqlDataType} from "../../platform-core/schema/table/datatypes/IntegerSqlDataType";
import {_saveSchemaObjectApiResponse} from "../../platform-core/schema/api/_saveSchemaObjectApiResponse";
import {IIntegerSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IIntegerSqlDataTypeProps";
import {_SchemaTable} from "../../platform-core/server/schema/table/_SchemaTable";
import {IFkSqlDataTypeProps} from "../../platform-core/schema/table/datatypes/IFkSqlDataTypeProps";
import {FkSqlDataType} from "../../platform-core/schema/table/datatypes/FkSqlDataType";
import {_getSHA256base64Id} from "../../platform-core/utils/_getSHA256base64Id";
import {SchemaForm} from "../../platform-core/schema/form/SchemaForm";

export async function importBuhta3Tables() {
    await _sequelizeInit();
    await _buhta3SequelizeInit();

    let getIdFromTableName = (name: string): string => {
        return _getSHA256base64Id("imported-from-buhta3-" + name);
    }

    let tables = await _buhta3Sequelize.query("SELECT * FROM SchemaTable WHERE TableName like 'ТМЦ%' OR TableName like 'Сот%' OR TableName like 'Орг%'", {type: _buhta3Sequelize.QueryTypes.SELECT});

//    console.log(tables);

    for (let table of tables) {

        let obj: ISchemaTableProps = {
            id: SchemaTable.classInfo.recordIdPrefix + ":" + getIdFromTableName(table["TableName"]),//getSHA256base64Id("imported-from-buhta3-" + table["TableName"]),
            className: SchemaTable.classInfo.className,
            name: table["TableName"],
            description: "",
            columns: [],
            // editOptions: {
            //     editPageId: "schema-page:NGJkOGI5YWY2MmM3NThm"
            // }

        }

        if (table["TableName"]==="Организация"){
            obj.editOptions={
                editFormId:SchemaForm.classInfo.recordIdPrefix+":"+ "MGQ5OTM1MDRlN2Q4NmVl"
            }
        }


        let columns = await _buhta3Sequelize.query("SELECT * FROM SchemaTableField WHERE TableName=$TableName ORDER BY Position", {
            bind: table,
            type: _buhta3Sequelize.QueryTypes.SELECT
        });

        let index = 0;
        for (let col of columns) {
            let dataType: string;

            let newcol: ISchemaTableColumnProps & IStringSqlDataTypeProps = {} as any;

            newcol.name = col["FieldName"];
            if (newcol.name === table["KeyFieldName"])
                newcol.primaryKey = true;

            if (col["DataType"] === "Строка") {
                let dataType: IStringSqlDataTypeProps = {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: col["DataSize"]
                };
                newcol.dataType = dataType;
                obj.columns.push(newcol);
                newcol.description = "pos " + index++;
            }
            else if (col["DataType"] === "Целое") {
                let dataType: IIntegerSqlDataTypeProps = {
                    className: IntegerSqlDataType.classInfo.className,
                    size: "32"
                };
                newcol.dataType = dataType;
                obj.columns.push(newcol);
                newcol.description = "pos " + index++;
            }
            else if (col["DataType"] === "Ссылка") {
                let dataType: IFkSqlDataTypeProps = {
                    className: FkSqlDataType.classInfo.className,
                    fkTableId: SchemaTable.classInfo.recordIdPrefix + ":" + getIdFromTableName(col["ForeignTable"])
                };
                newcol.dataType = dataType;
                obj.columns.push(newcol);
                newcol.description = "pos " + index++;
            }
        }


        //console.log("импортирована таблица '" + table["TableName"] + "'", obj);

        let schemaTable = new _SchemaTable(obj);
        //schemaTable.props=obj;
        await schemaTable.save();

        console.log("импортирована таблица '" + schemaTable.props.name + "'");
    }

}

importBuhta3Tables().then(() => {
    process.exit(0);
});