export interface _IConfig {
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlLogin: string;
    sqlPassword: string;
    sqlDatabase: string;
    port:number;
    projectRootPath:string;
}

let dirA: _IConfig = {
    sqlServerAddress: "player.buhta.ru",
    sqlServerInstance: "",
    sqlServerPort: 1433,
    sqlLogin: "sa",
    sqlPassword: "sonyk",
    sqlDatabase: "EdemTV",
    port:3001,
    projectRootPath:"C:/----BUHTA----"
};


export let _config :_IConfig = dirA;
//изменено 888-999