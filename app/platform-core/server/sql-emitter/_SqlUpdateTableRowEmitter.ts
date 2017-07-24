import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
//import {_SqlDataType} from "../schema/table/sql/_SqlDataType";
import {_ISqlDataType} from "../schema/database/datatype/_BaseSqlDataType";

export class _SqlUpdateTableRowEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable, public row: any) {
        super(dialect);
    }


    toSql(): string {
        let sql: string[] = [];
        let colNames: string[] = [];
        let colValues: any[] = [];

        let primaryKeyColumn: _ISqlTableColumn | null = null;

        sql.push("UPDATE ");

        sql.push(this.tableNameToSql(this.table));

        sql.push(" SET ");

        for (let col of this.table.columns) {
            if (col.primaryKey)
                primaryKeyColumn = col;

            if (this.row[col.name] !== undefined) {
                colNames.push(this.identifierToSql(col.name)+"="+this.valueToSql(col, this.row[col.name]));
            }
        }
        if (!primaryKeyColumn) {
            let msg = "у таблицы '" + this.table.name + "' нет первичного ключа";
            console.error(msg);
            throw msg + ", " + __filename;
        }

        sql.push(colNames.join(","));

        sql.push(" WHERE " + this.identifierToSql(primaryKeyColumn.name) + "=" + this.valueToSql(primaryKeyColumn, this.row[primaryKeyColumn.name]));



        return sql.join("");
    }

}
