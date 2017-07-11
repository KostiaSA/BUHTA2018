import {_buhta3Sequelize, _buhta3SequelizeInit} from "../_buhta3Sequelize";
import {_sequelizeInit} from "../../platform-core/server/_sequelize";
import {ISchemaTableProps} from "../../platform-core/schema/table/ISchemaTableProps";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {getSHA256base64Id} from "../../platform-core/utils/getSHA256base64Id";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {StringSqlDataType} from "../../platform-core/schema/table/StringSqlDataType";
import {IStringSqlDataTypeProps} from "../../platform-core/schema/table/IStringSqlDataTypeProps";
import {IntegerSqlDataType} from "../../platform-core/schema/table/IntegerSqlDataType";
import {_saveSchemaObjectApiResponse} from "../../platform-core/schema/api/_saveSchemaObjectApiResponse";
import {IIntegerSqlDataTypeProps} from "../../platform-core/schema/table/IIntegerSqlDataTypeProps";
import {_SchemaTable} from "../../platform-core/server/schema/table/_SchemaTable";

export async function importBuhta3Tables() {
    await _sequelizeInit();
    await _buhta3SequelizeInit();

    let tables = await _buhta3Sequelize.query("SELECT * FROM SchemaTable WHERE TableName like 'Орг%' OR TableName like 'Сот%'", {type: _buhta3Sequelize.QueryTypes.SELECT});

//    console.log(tables);

    for (let table of tables) {
        // ------------------ startPage ------------------
        let obj: ISchemaTableProps = {
            id: getSHA256base64Id("imported-from-buhta3-" + table["TableName"]),
            className: SchemaTable.classInfo.className,
            type: "SchemaTable",
            name: table["TableName"],
            description: "",
            columns: []
        }

        let columns = await _buhta3Sequelize.query("SELECT * FROM SchemaTableField WHERE TableName=$TableName ORDER BY Position", {
            bind: table,
            type: _buhta3Sequelize.QueryTypes.SELECT
        });
        //console.log( columns);

        for (let col of columns) {

            let dataType: string;

            let newcol: ISchemaTableColumnProps & IStringSqlDataTypeProps = {} as any;

            newcol.name = col["FieldName"];

            if (col["DataType"] === "Строка") {
                let dataType: IStringSqlDataTypeProps = {
                    className: StringSqlDataType.classInfo.className,
                    maxLen: col["DataSize"]
                };
                newcol.dataType = dataType;
                obj.columns.push(newcol);
            }
            else if (col["DataType"] === "Целое") {
                let dataType: IIntegerSqlDataTypeProps = {
                    className: IntegerSqlDataType.classInfo.className,
                    size : "32"
                };
                newcol.dataType = dataType;
                obj.columns.push(newcol);
            }
        }


        //console.log("импортирована таблица '" + table["TableName"] + "'", obj);

        let schemaTable=new _SchemaTable(obj);
        //schemaTable.props=obj;
        await schemaTable.save();

        console.log("импортирована таблица '" + schemaTable.props.name + "'");
    }

}

importBuhta3Tables().then(() => {
    process.exit(0);
});