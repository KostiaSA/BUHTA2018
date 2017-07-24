import {_ISqlDriver} from "./_ISqlDriver";
import * as mssql from "mssql";
import {config, ConnectionPool, IRecordSet} from "mssql";
import {ISchemaDatabaseProps} from "../../../schema/database/ISchemaDatabaseProps";
import {_ISqlTable} from "./_SqlTable";
import {_SqlCreateTableEmitter} from "../../sql-emitter/_SqlCreateTableEmitter";

export class _MsSqlDriver implements _ISqlDriver {
    constructor(public props: ISchemaDatabaseProps) {
    }

    get config(): config {
        return {
            driver: "?",
            user: this.props.sqlLogin,
            password: this.props.sqlPassword,
            server: this.props.sqlServerAddress,
            port: this.props.sqlServerPort,
            //domain?: string;
            database: this.props.sqlDatabase,
            connectionTimeout: 10000,
            requestTimeout: 3 * 3600 * 24 * 1000, // 3 дня
            //stream?: boolean;
            //parseJSON?: boolean;
            options: {
                instanceName: this.props.sqlServerInstance,
                appName: "buhta",
                abortTransactionOnError: true,
                trustedConnection: false,
                //encrypt?: boolean;
                useUTC: false,
                //tdsVersion?: string;
            },
            pool: {
                min: 0,
                max: 200,
                idleTimeoutMillis: 30000,
                //maxWaitingClients ? : number;
                //testOnBorrow ? : boolean;
                //acquireTimeoutMillis ? : number;
                //fifo ? : boolean;
                //priorityRange ? : number;
                //autostart ? : boolean;
                //evictionRunIntervalMillis ? : number;
                //numTestsPerRun ? : number;
                //softIdleTimeoutMillis ? : number;
                //Promise ? : any;
            }
        }
    }

    pool: ConnectionPool;

    async connect() {
        if (!this.pool) {
            this.pool = await ((mssql as any).connect(this.config));
        }
    }

    // поля BigInt приходят в виде строк, превращаем в Number
    postProcessResultRecordsets(recordsets: IRecordSet<any>[]) {
        for (let recordset of recordsets) {
            for (let columnName in recordset.columns) {
                let colMetadata = recordset.columns[columnName];
                if ((colMetadata.type as any).name === "BigInt") {
                    for (let row of recordset) {
                        row[columnName] = Number.parseInt(row[columnName]);
                    }
                }
            }
        }
    }

    async executeSqlBatch(sql: string[]): Promise<any[][]> {
        if (!this.pool.connected) {
            await this.pool.connect();
        }
        let result = await this.pool.request().query(sql.join(";\n"));

        this.postProcessResultRecordsets(result.recordsets);
        return result.recordsets;
    }

    async createTable(table: _ISqlTable): Promise<void> {

        let emitter = new _SqlCreateTableEmitter("mssql", table);
        let sql = emitter.toSql();
        let result = await this.pool.request().query(sql);

    }
}