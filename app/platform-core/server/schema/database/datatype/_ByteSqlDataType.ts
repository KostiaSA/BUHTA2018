
import {_ISqlDataType} from "./_BaseSqlDataType";
import {SqlDialect} from "../../../../schema/table/datatypes/SqlDataType";
import {error} from "util";

export class _ByteSqlDataType implements _ISqlDataType{

    getSqlDeclare(dialect:SqlDialect):string{
        if (dialect === "mssql")
            return "TINYINT";
        else {
            let msg = "invalid sql dialect '" + dialect + "'";
            console.error(msg);
            throw msg + ", " + __filename;
        }

    }
}