
import {_schemaObjectQueryInstall} from "../platform-admin/install/_schemaObjectQueryInstall";
import {_serverStartup as _coreServerStartup} from "../platform-core/_serverStartup";
import {_serverStartup} from "./_serverStartup";
import {_schemaObjectListPageInstall} from "./install/_schemaObjectListPageInstall";
import {_schemaTableDesignerPageInstall} from "./install/_schemaTableDesignerPageInstall";

export async function packageInstall() {
    await _coreServerStartup();
    await _serverStartup();

    await _schemaObjectQueryInstall();
    await _schemaObjectListPageInstall();
    await _schemaTableDesignerPageInstall();

}

packageInstall().then(() => {
    process.exit(0);
});