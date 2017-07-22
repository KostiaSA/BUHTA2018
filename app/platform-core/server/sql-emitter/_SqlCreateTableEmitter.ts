import {_SqlEmitter} from "./_SqlEmitter";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
//import {_SqlDataType} from "../schema/table/sql/_SqlDataType";
import {_ISqlDataType} from "../schema/database/datatype/_BaseSqlDataType";

export class _SqlCreateTableEmitter extends _SqlEmitter {

    constructor(public dialect: SqlDialect, public table: _ISqlTable) {
        super(dialect);
    }

//    sql: string[] = [];

    emitColumnDataType(col: _ISqlTableColumn): string {
        if (this.dialect === "mssql")
            return this.emitColumnDataType_mssql(col);
        // else if (e.dialect === "pg")
        //     this.emitColumnDataTypePg(col, e);
        // else if (e.dialect === "mysql")
        //     this.emitColumnDataTypeMySql(col, e);
        else {
            let msg = "_SqlCreateTableEmitter: invalid sql dialect '" + this.dialect + "'";
            console.error(msg);
            throw msg + ", " + __filename;
        }
    }

    private emitColumnDataType_mssql(col: _ISqlTableColumn): string {
        switch (col.dataType) {
            case "sbyte":
                return ("SMALLINT");
            case "byte":
                return ("TINYINT");
            case "short":
                return ("SMALLINT");
            case "ushort":
                return ("INT");
            case "int":
                return ("INT");
            case "uint":
                return ("BIGINT");
            case "long":
                return ("BIGINT");
            case "ulong":
                return ("DECIMAL(38)");
            case "float":
                return ("REAL");
            case "double":
                return ("FLOAT");
            case "decimal":
                if (!col.dataLen || col.dataLen < 0 || col.dataLen > 38) {
                    let msg = "'Precision' of decimal column '" + col.name + "' must be 0..38";
                    console.error(msg);
                    throw msg + ", " + __filename;
                }
                if (!col.decimals || col.decimals < 0 || col.decimals > 38) {
                    let msg = "'Scale' of decimal column '" + col.name + "' must be 0..38";
                    console.error(msg);
                    throw msg + ", " + __filename;
                }
                return (`DECIMAL(${col.dataLen},${col.decimals})`);
            case "string":
                if (!col.dataLen || col.dataLen < 1 || col.dataLen > 4000) {
                    let msg = "'Length' of string column '" + col.name + "' must be 1..4000";
                    console.error(msg);
                    throw msg + ", " + __filename;
                }
                return (`NVARCHAR(${col.dataLen})`);
            case "text":
                return ("NVARCHAR(MAX)");
            case "guid":
                return ("UNIQUEIDENTIFIER");
            case "date":
                return ("DATE");
            case "datetime":
                return ("DATETIME2");
            case "timestamp":
                return ("DATETIME2 DEFAULT(GETDATE())");
            case "blob":
                return (" IMAGE");

            default: {
                let msg = "NotImplemented";
                console.error(msg);
                throw msg + ", " + __filename;
            }

        }
    }

    // private emitColumnDataTypePg(col: CreateColumn, e: SqlEmitter) {
    //     switch (col.dataType) {
    //         case "sbyte":
    //             e.emit("SMALLINT");
    //             break;
    //         case "byte":
    //             e.emit("SMALLINT");
    //             break;
    //         case "short":
    //             e.emit("SMALLINT");
    //             break;
    //         case "ushort":
    //             e.emit("INT");
    //             break;
    //         case "int":
    //             e.emit("INT");
    //             break;
    //         case "uint":
    //             e.emit("BIGINT");
    //             break;
    //         case "long":
    //             e.emit("BIGINT");
    //             break;
    //         case "ulong":
    //             e.emit("NUMERIC(38)");
    //             break;
    //         case "float":
    //             e.emit("REAL");
    //             break;
    //         case "double":
    //             e.emit("DOUBLE PRECISION");
    //             break;
    //         case "decimal":
    //             if (!col.dataLen || col.dataLen < 0 || col.dataLen > 38) throwError("'Precision' of decimal column '" + col.column + "' must be 0..38");
    //             if (!col.decimals || col.decimals < 0 || col.decimals > 38) throwError("'Scale' of decimal column '" + col.column + "' must be 0..38");
    //             e.emit(`NUMERIC(${col.dataLen},${col.decimals})`);
    //             break;
    //         case "string":
    //             if (!col.dataLen || col.dataLen < 1 || col.dataLen > 4000) throwError("'Length' of string column '" + col.column + "' must be 1..4000");
    //             e.emit(`VARCHAR(${col.dataLen})`);
    //             break;
    //         case "text":
    //             e.emit("TEXT");
    //             break;
    //         case "guid":
    //             e.emit("UUID");
    //             break;
    //         case "date":
    //             e.emit("DATE");
    //             break;
    //         case "datetime":
    //             e.emit("TIMESTAMP");
    //             break;
    //         //case "datetime": e.emit("TIMESTAMP WITH TIME ZONE"); break;
    //         case "timestamp":
    //             e.emit("TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
    //             break;
    //         case "blob":
    //             e.emit(" BYTEA");
    //             break;
    //
    //         default:
    //             throwError("NotImplemented");
    //     }
    // }

    toSql(): string {
        let sql: string[] = [];
        if (this.table.isTemp) {
            if (this.dialect === "mssql")
                sql.push("CREATE TABLE ");
            else if (this.dialect === "postgres")
                sql.push("CREATE TEMPORARY TABLE ");
            else if (this.dialect === "mysql")
                sql.push("CREATE TEMPORARY TABLE ");
            else {
                let msg = "_SqlCreateTableEmitter: invalid sql dialect '" + this.dialect + "'";
                console.error(msg);
                throw msg + ", " + __filename;
            }

        }
        else
            sql.push("CREATE TABLE ");

        if (this.table.isTemp && this.dialect === "mssql")
            sql.push(this.identifierToSql("#" + this.table.name));
        else
            sql.push(this.identifierToSql(this.table.name));

        sql.push("(\n");

        let colsSql: string[] = [];
        this.table.columns.forEach((col: _ISqlTableColumn, index: number) => {
            colsSql.push("  " + this.identifierToSql(col.name) + " " + this.emitColumnDataType(col));
        });
        sql.push(colsSql.join(",\n") + "\n");

        sql.push(")\n");

        return sql.join("");
    }

}
