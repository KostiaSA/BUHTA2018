import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
//import {_SqlDataType} from "../schema/table/sql/_SqlDataType";
import {_ISqlDataType} from "../schema/database/datatype/_BaseSqlDataType";

export class _SqlUpsertTableRowEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable, public row: any) {
        super(dialect);
    }


    toSql(): string {
        let sql: string[] = [];
        let colSet: string[] = [];
        let colNames: string[] = [];
        let colValues: any[] = [];

        let primaryKeyColumn: _ISqlTableColumn | null = null;

        for (let col of this.table.columns) {
            if (col.primaryKey)
                primaryKeyColumn = col;

            if (this.row[col.name] !== undefined) {
                colSet.push(this.identifierToSql(col.name)+"="+this.valueToSql(col, this.row[col.name]));
                colNames.push(this.identifierToSql(col.name));
                colValues.push(this.valueToSql(col, this.row[col.name]));
            }
        }
        if (!primaryKeyColumn) {
            let msg = "у таблицы '" + this.table.name + "' нет первичного ключа";
            console.error(msg);
            throw msg + ", " + __filename;
        }

        sql.push("BEGIN TRAN\n");
        sql.push("  IF EXISTS(SELECT 1 FROM "+this.tableNameToSql(this.table)+" WHERE " + this.identifierToSql(primaryKeyColumn.name) + "=" + this.valueToSql(primaryKeyColumn, this.row[primaryKeyColumn.name])+")");
        sql.push("\n");
        sql.push("    UPDATE ");
        sql.push(this.tableNameToSql(this.table));
        sql.push(" SET ");
        sql.push(colSet.join(","));
        sql.push(" WHERE " + this.identifierToSql(primaryKeyColumn.name) + "=" + this.valueToSql(primaryKeyColumn, this.row[primaryKeyColumn.name]));
        sql.push("\n");
        sql.push("  ELSE ");
        sql.push("\n");
        sql.push("    INSERT INTO ");
        sql.push(this.tableNameToSql(this.table));
        sql.push(" (" + colNames.join(",") + ")");
        sql.push(" VALUES (" + colValues.join(",") + ")");
        sql.push("\nCOMMIT\n");

        return sql.join("");
    }

}
