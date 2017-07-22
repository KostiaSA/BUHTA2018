import {_SchemaObject} from "../_SchemaObject";
import {SchemaDatabase} from "../../../schema/database/SchemaDatabase";
import {ISchemaDatabaseProps} from "../../../schema/database/ISchemaDatabaseProps";
import * as mssql from "mssql";
import {config} from "mssql";
import {_ISqlDriver} from "./_ISqlDriver";
import {_MsSqlDriver} from "./_MsSqlDriver";
import {_ISqlTable} from "./_SqlTable";

export class _SchemaDatabase extends _SchemaObject<ISchemaDatabaseProps> {
    static classInfo = {...SchemaDatabase.classInfo, constructor: _SchemaDatabase};


    driver: _ISqlDriver;

    async initDriver() {
        if (!this.driver) {
            if (this.props.sqlDialect === "mssql")
                return  this.driver=new _MsSqlDriver(this.props);
            else {
                let msg = "initDriver(): invalid sql dialect " + this.props.sqlDialect;
                console.error(msg);
                throw msg + ", " + __filename;
            }

        }
    }


    async executeSqlBatch(sql: string[]): Promise<any[][]> {
        await this.initDriver();
        return this.driver.executeSqlBatch(sql);
    }

    async createTable(table: _ISqlTable): Promise<void>{
        await this.initDriver();
        return this.driver.createTable(table);

    }


}