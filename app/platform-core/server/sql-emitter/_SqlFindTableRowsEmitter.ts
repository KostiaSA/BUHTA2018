import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";

export class _SqlFindTableRowsEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable, public where: string, public columns?: string[], public skipColumns?: string[]) {
        super(dialect);
    }


    toSql(): string {
        let sql: string[] = [];
        let colNames: string[] = [];

        sql.push("SELECT ");

        //let primaryKeyColumn: _ISqlTableColumn | null = null;

        for (let col of this.table.columns) {
            // if (col.primaryKey)
            //     primaryKeyColumn = col;

            let colOk = true;
            if (this.columns && this.columns.indexOf(col.name) === -1)
                colOk = colOk && false;
            if (this.skipColumns && this.skipColumns.indexOf(col.name) > -1)
                colOk = colOk && false;

            if (colOk) {
                colNames.push(this.identifierToSql(col.name));
            }
        }

        sql.push(colNames.join(","));

        sql.push(" FROM " + this.tableNameToSql(this.table));


        // if (!primaryKeyColumn) {
        //     let msg = "у таблицы '" + this.table.name + "' нет первичного ключа";
        //     console.error(msg);
        //     throw msg + ", " + __filename;
        // }

        sql.push(" WHERE " + this.where);

        return sql.join("");
    }

}
