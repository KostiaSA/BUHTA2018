export interface _IConfig {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
    sqlDialect: string;
}

let office: _IConfig = {
    sqlServerAddress: "ps-web",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa1",
    sqlPassword: "sonyk",
    sqlDatabase: "MAG3305",
    sqlDialect: "mssql",
};

let home: _IConfig = {
    sqlServerAddress: "localhost",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa",
    sqlPassword: "sonyk",
    sqlDatabase: "MAG3305",
    sqlDialect: "mssql",
};


export let _config: _IConfig = home;
//изменено 888-999