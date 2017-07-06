import {appState} from "../platform-core/AppState";
import {_buhta3SequelizeInit} from "./_buhta3Sequelize";

export async function clientStartup() {
    await _buhta3SequelizeInit();
    console.log("buhta3-import startup ok")

}