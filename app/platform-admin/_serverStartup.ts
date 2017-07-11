import {serverState} from "../platform-core/server/ServerState";
export async function _serverStartup() {

    serverState.registerExternalScript(`<script src="/platform-admin/static/js/codemirror.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-admin/static/js/codemirror-mode/sql.js"></script>`);

    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-admin/static/css/codemirror.css">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-admin/static/css/platform-admin.css">`);

    console.log("package platform-admin: startup Ok");

}