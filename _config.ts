import {SqlDialect} from "./app/platform-core/schema/table/datatypes/SqlDataType";

export interface _IConfig {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
    sqlDialect: SqlDialect;
    port:number;
    projectRootPath:string;
}

let office: _IConfig = {
    sqlServerAddress: "ps-web",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa1",
    sqlPassword: "sonyk",
    sqlDatabase: "MAG3305",
//    sqlDatabase: "Buhta2018",
    sqlDialect: "mssql",
    port:3001,
    projectRootPath:"C:/----BUHTA----"
};

let home: _IConfig = {
    sqlServerAddress: "localhost",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa",
    sqlPassword: "sonyk",
    sqlDatabase: "MAG3305",
    sqlDialect: "mssql",
    port:3001,
    projectRootPath:"C:/----BUHTA----"
};


export let _config :_IConfig = home;
//изменено 888-999