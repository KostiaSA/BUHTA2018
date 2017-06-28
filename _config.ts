export interface _IConfig {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
    sqlDialect: string;
    port:number;
    projectRootPath:string;
}

let dirA: _IConfig = {
    sqlServerAddress: "ps-web",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa1",
    sqlPassword: "sonyk",
    sqlDatabase: "Buhta2018",
    sqlDialect: "mssql",
    port:3001,
    projectRootPath:"C:/----BUHTA----"
};


export let _config :_IConfig = dirA;
//изменено 888-999