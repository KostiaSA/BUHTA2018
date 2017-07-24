import {_SchemaObject} from "../_SchemaObject";
import {SchemaDatabase} from "../../../schema/database/SchemaDatabase";
import {ISchemaDatabaseProps} from "../../../schema/database/ISchemaDatabaseProps";
import * as mssql from "mssql";
import {config} from "mssql";
import {_ISqlDriver} from "./_ISqlDriver";
import {_MsSqlDriver} from "./_MsSqlDriver";
import {_ISqlTable} from "./_SqlTable";
import {_SqlCreateTableEmitter} from "../../sql-emitter/_SqlCreateTableEmitter";
import {_SqlSelectTableRowEmitter} from "../../sql-emitter/_SqlSelectTableRowEmitter";
import {_SqlEmitter} from "../../sql-emitter/_SqlEmitter";
import {_SqlUpsertTableRowEmitter} from "../../sql-emitter/_SqlUpsertTableRowEmitter";
import {_SqlUpdateTableRowEmitter} from "../../sql-emitter/_SqlUpdateTableRowEmitter";
import {_SqlInsertTableRowEmitter} from "../../sql-emitter/_SqlInsertTableRowEmitter";
import {_SqlDeleteTableRowEmitter} from "../../sql-emitter/_SqlDeleteTableRowEmitter";

export class _SchemaDatabase extends _SchemaObject<ISchemaDatabaseProps> {
    static classInfo = {...SchemaDatabase.classInfo, constructor: _SchemaDatabase};


    driver: _ISqlDriver;

    async initDriver() {
        if (!this.driver) {
            if (this.props.sqlDialect === "mssql")
                return this.driver = new _MsSqlDriver(this.props);
            else {
                let msg = "initDriver(): invalid sql dialect " + this.props.sqlDialect;
                console.error(msg);
                throw msg + ", " + __filename;
            }

        }
    }


    createSqlEmitter(): _SqlEmitter {
        return new _SqlEmitter(this.props.sqlDialect);
    }

    async executeSqlBatch(sql: string[]): Promise<any[][]> {
        await this.initDriver();
        return this.driver.executeSqlBatch(sql);
    }

    async createTable(table: _ISqlTable): Promise<void> {
        await this.initDriver();
        let emitter = new _SqlCreateTableEmitter(this.props.sqlDialect, table);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
    }

    async selectTableRow(table: _ISqlTable, rowId: any, columns?: string[], skipColumns?: string[]): Promise<any> {
        await this.initDriver();

        let emitter = new _SqlSelectTableRowEmitter(this.props.sqlDialect, table, rowId, columns, skipColumns);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
        let row = result[0][0];

        return row;
    }

    async insertTableRow(table: _ISqlTable, row: any): Promise<void> {
        await this.initDriver();
        let emitter = new _SqlInsertTableRowEmitter(this.props.sqlDialect, table, row);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
    }

    async upsertTableRow(table: _ISqlTable, row: any): Promise<void> {
        await this.initDriver();
        let emitter = new _SqlUpsertTableRowEmitter(this.props.sqlDialect, table, row);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
    }

    async updateTableRow(table: _ISqlTable, row: any): Promise<void> {
        await this.initDriver();
        let emitter = new _SqlUpdateTableRowEmitter(this.props.sqlDialect, table, row);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
    }

    async deleteTableRow(table: _ISqlTable, row: any): Promise<void> {
        await this.initDriver();
        let emitter = new _SqlDeleteTableRowEmitter(this.props.sqlDialect, table, row);
        let result = await this.driver.executeSqlBatch([emitter.toSql()]);
    }

}