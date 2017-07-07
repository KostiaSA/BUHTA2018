
import {_sequelizeInit} from "./server/_sequelize";
import {serverState} from "./server/ServerState";
import {_StringSqlDataType} from "./server/sql/_StringSqlDataType";
import {_IntegerSqlDataType} from "./server/sql/_IntegerSqlDataType";
import {_FkSqlDataType} from "./server/sql/_FkSqlDataType";

export async function _serverStartup() {
    await _sequelizeInit();

    serverState.registerSqlDataType(_StringSqlDataType);
    serverState.registerSqlDataType(_IntegerSqlDataType);
    serverState.registerSqlDataType(_FkSqlDataType);

    console.log("package platform-core: startup Ok");
}