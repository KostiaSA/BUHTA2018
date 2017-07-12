import {_schemaObjectTableInstall} from "./install/_schemaObjectTableInstall";
import {_serverStartup} from "./_serverStartup";

export async function packageInstall() {
    await _serverStartup();

    await _schemaObjectTableInstall();

}

packageInstall().then(() => {
    process.exit(0);
});