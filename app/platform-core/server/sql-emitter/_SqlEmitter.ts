import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";
import {_ISqlTable, _ISqlTableColumn, _SqlDataType} from "../schema/database/_SqlTable";
import * as uuid from "uuid";
import * as moment from "moment";
import {isDate, isNumber} from "util";

export class _SqlEmitter {
    constructor(public dialect: SqlDialect) {

    }

    private mssql_escape_string(str: string) {
        return str.replace(/./g, function (char: string): string {
            switch (char) {
                case "'":
                    return "''";
                default:
                    return char;
            }
        });
    }

    private postgres_escape_string(str: string) {
        return str.replace(/./g, function (char: string): string {
            switch (char) {
                case "\0":
                    return "";
                case "'":
                    return "''";
                default:
                    return char;
            }
        });
    }

    private mysql_escape_string(str: string) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\]/g, function (char: string): string {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\Z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                    return "\\" + char;
                default:
                    throw "mysql_escape_string?";
            }
        });
    }


    toHexString(bytes: any) {
        return bytes.map(function (byte: any) {
            return ("00" + (byte & 0xFF).toString(16)).slice(-2);
        }).join("");
    }

    mysql_guid_to_str(guid: any): string {
        return "0x" + this.toHexString(guid);
    }

    nullToSql(): string {

        if (this.dialect === "mssql")
            return "NULL";
        else if (this.dialect === "postgres")
            return "NULL";
        else if (this.dialect === "mysql")
            return "NULL";
        else {
            let msg = "invalid sql dialect " + this.dialect;
            console.error(msg);
            throw msg + ", " + __filename;
        }

    }

    tableNameToSql(table: _ISqlTable): string {
        if (table.isTemp && this.dialect === "mssql")
            return this.identifierToSql("#" + table.name);
        else
            return this.identifierToSql(table.name);
    }


    identifierToSql(name: string): string {

        if (this.dialect === "mssql")
            return "[" + name + "]";
        else if (this.dialect === "postgres")
            return "\"" + name + "\"";
        else if (this.dialect === "mysql")
            return "`" + name + "`";
        else {
            let msg = "invalid sql dialect " + this.dialect;
            console.error(msg);
            throw msg + ", " + __filename;
        }

    }

    stringToSql(value: string): string {
        if (value === null)
            return this.nullToSql();
        else {
            if (this.dialect === "mssql")
                return "N'" + this.mssql_escape_string(value) + "'";
            else if (this.dialect === "postgres")
                return "'" + this.postgres_escape_string(value) + "'";
            else if (this.dialect === "mysql")
                return "'" + this.mysql_escape_string(value) + "'";
            else {
                let msg = "invalid sql dialect " + this.dialect;
                console.error(msg);
                throw msg + ", " + __filename;
            }
        }
    }

    guidToSql(value: string): string {

        if (this.dialect === "mssql")
            return "CONVERT(UNIQUEIDENTIFIER,'" + value + "')";
        else if (this.dialect === "postgres")
            return "UUID '" + value + "'";
        else if (this.dialect === "mysql")
            return "convert(" + this.mysql_guid_to_str((uuid as any).parse(value)) + ",binary(16))";
        else {
            let msg = "invalid sql dialect " + this.dialect;
            console.error(msg);
            throw msg + ", " + __filename;
        }
    }

    datetimeToSql(value: Date): string {
        if (this.dialect === "mssql")
            return "CONVERT(DATETIME2,'" + moment(value).format("YYYYMMDD HH:mm:ss.SSS") + "')";
        else if (this.dialect === "postgres")
            return "TIMESTAMP(3)'" + moment(value).format("YYYY-MM-DD HH:mm:ss.SSS") + "'";
        else if (this.dialect === "mysql")
        // timezone не воспринимает
            return "STR_TO_DATE('" + moment(value).format("YYYY-MM-DD HH:mm:ss.SSS") + "','%Y-%c-%d %k:%i:%s.%f')";
        else {
            let msg = "invalid sql dialect " + this.dialect;
            console.error(msg);
            throw msg + ", " + __filename;
        }

    }

    dateToSql(value: Date): string {
        if (this.dialect === "mssql")
            return "CONVERT(DATE,'" + moment(value).format("YYYYMMDD") + "')";
        else if (this.dialect === "postgres")
            return "TIMESTAMP(3)'" + moment(value).format("YYYY-MM-DD") + "'";
        else if (this.dialect === "mysql")
        // timezone не воспринимает
            return "STR_TO_DATE('" + moment(value).format("YYYY-MM-DD") + "','%Y-%c-%d')";
        else {
            let msg = "invalid sql dialect " + this.dialect;
            console.error(msg);
            throw msg + ", " + __filename;
        }

    }

    isNumericDataType(dataType: _SqlDataType) {
        return (
            dataType === "byte" ||
            dataType === "sbyte" ||
            dataType === "short" ||
            dataType === "ushort" ||
            dataType === "int" ||
            dataType === "uint" ||
            dataType === "long" ||
            dataType === "ulong" ||
            dataType === "float" ||
            dataType === "double" ||
            dataType === "decimal"
        );
    }

    valueToSql(column: _ISqlTableColumn, value: any): string {
        if (this.isNumericDataType(column.dataType)) {
            if (isNumber(value))
                return value.toString();
            else
                return Number.parseFloat(value.toString()).toString();
        }
        if (column.dataType === "string" || column.dataType === "text") {
            return this.stringToSql(value.toString());
        }
        else if (column.dataType === "datetime") {
            if (isDate(value)) {
                return this.datetimeToSql(value);
            }
            else {
                return this.datetimeToSql(new Date(value.toString()));
            }
        }
        else if (column.dataType === "date") {
            if (isDate(value)) {
                return this.dateToSql(value);
            }
            else {
                return this.dateToSql(new Date(value.toString()));
            }
        }
        else {
            let msg = "invalid dataType " + column.dataType;
            console.error(msg);
            throw msg + ", " + __filename;
        }
    }

    toSql(): string {
        return "";
    }

}
