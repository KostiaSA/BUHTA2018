import {_ISqlTable} from "./_SqlTable";

export interface _ISqlDriver {
    executeSqlBatch(sql: string[]): Promise<any[][]>;

    // createTable(table: _ISqlTable): Promise<void>;
    //
    // selectTableRow(table: _ISqlTable, rowId: any): Promise<any>;



}