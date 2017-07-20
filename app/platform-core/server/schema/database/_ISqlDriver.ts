export interface _ISqlDriver {
    executeSqlBatch(sql: string[]): Promise<any[][]>;
}