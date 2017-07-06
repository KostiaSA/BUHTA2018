
import {_sequelizeInit} from "./server/_sequelize";

export async function _serverStartup() {
    await _sequelizeInit();
    console.log("package platform-core: startup Ok");
}