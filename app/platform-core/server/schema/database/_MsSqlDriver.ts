import {_ISqlDriver} from "./_ISqlDriver";
import {config} from "mssql";
import {ISchemaDatabaseProps} from "../../../schema/database/ISchemaDatabaseProps";

export class _MsSqlDriver implements _ISqlDriver{
    constructor(public props:ISchemaDatabaseProps){

    }

    get sql_config(): config {
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
                //useUTC?: boolean;
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

    async executeSqlBatch(sql: string[]): Promise<any[][]> {
        throw  ""
    }

}