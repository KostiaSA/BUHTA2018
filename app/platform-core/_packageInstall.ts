import {_schemaObjectTableInstall} from "./install/_schemaObjectTableInstall";
import {_serverStartup} from "./_serverStartup";
import {_schemaTableDesignerPageInstall} from "../platform-admin/install/_schemaTableDesignerPageInstall";

export async function packageInstall() {
    await _serverStartup();

    await _schemaObjectTableInstall();
    await _schemaTableDesignerPageInstall();

}

packageInstall().then(() => {
    process.exit(0);
});