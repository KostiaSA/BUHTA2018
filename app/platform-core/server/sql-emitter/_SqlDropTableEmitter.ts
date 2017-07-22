import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
//import {_SqlDataType} from "../schema/table/sql/_SqlDataType";
import {_ISqlDataType} from "../schema/database/datatype/_BaseSqlDataType";

export class _SqlDropTableEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable) {
        super(dialect);
    }

    toSql(): string {
        let sql: string[] = [];
        sql.push("DROP TABLE ");
        sql.push(this.tableNameToSql(this.table));
        return sql.join("");
    }

}
