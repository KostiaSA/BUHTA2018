import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
//import {_SqlDataType} from "../schema/table/sql/_SqlDataType";
import {_ISqlDataType} from "../schema/database/datatype/_BaseSqlDataType";

export class _SqlInsertTableRowEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable, public row: any) {
        super(dialect);
    }


    toSql(): string {
        let sql: string[] = [];
        let colNames: string[] = [];
        let colValues: any[] = [];

        sql.push("INSERT INTO ");

        sql.push(this.tableNameToSql(this.table));

        for (let col of this.table.columns) {
            if (this.row[col.name]) {
                colNames.push(this.identifierToSql(col.name));
                colValues.push(this.valueToSql(col,this.row[col.name]));
            }
        }

        sql.push(" ("+colNames.join(",")+")");
        sql.push(" VALUES ("+colValues.join(",")+")");


        return sql.join("");
    }

}
