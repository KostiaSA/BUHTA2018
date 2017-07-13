import {SqlDialect} from "../../schema/table/datatypes/SqlDataType";

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

    toSql(): string {
        return "";
    }

}
