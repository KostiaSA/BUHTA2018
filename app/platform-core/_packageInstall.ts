
import {_schemaObjectTableInstall} from "./install/_schemaObjectTableInstall";

export async function packageInstall() {

    await _schemaObjectTableInstall();
}

packageInstall().then(() => {
    process.exit(0);
});