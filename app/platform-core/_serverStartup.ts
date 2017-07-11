import {_sequelizeInit} from "./server/_sequelize";
import {serverState} from "./server/ServerState";
import {_StringSqlDataType} from "./server/sql/_StringSqlDataType";
import {_IntegerSqlDataType} from "./server/sql/_IntegerSqlDataType";
import {_FkSqlDataType} from "./server/sql/_FkSqlDataType";

export async function _serverStartup() {
    await _sequelizeInit();

    serverState.registerExternalScript(`<script src="/platform-core/static/js/jquery.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/react.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/react-dom.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/antd-with-locales.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/ag-grid.min.js"></script>`);

    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/ag-grid.css">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/antd.css">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/index.css">`);

    serverState.registerSqlDataType(_StringSqlDataType);
    serverState.registerSqlDataType(_IntegerSqlDataType);
    serverState.registerSqlDataType(_FkSqlDataType);

    console.log("package platform-core: startup Ok");
}