import {_sequelizeInit} from "./server/_sequelize";
import {serverState} from "./server/ServerState";
import {_StringSqlDataType} from "./server/schema/table/sql/_StringSqlDataType";
import {_IntegerSqlDataType} from "./server/schema/table/sql/_IntegerSqlDataType";
import {_FkSqlDataType} from "./server/schema/table/sql/_FkSqlDataType";
import {_SchemaQuery} from "./server/schema/query/_SchemaQuery";
import {_SchemaTable} from "./server/schema/table/_SchemaTable";

export async function _serverStartup() {
    await _sequelizeInit();


    serverState.registerClassInfo(_SchemaQuery.classInfo);
    serverState.registerClassInfo(_SchemaTable.classInfo);

    serverState.registerExternalScript(`<script src="/platform-core/static/js/jquery.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/react.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/react-dom.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/antd-with-locales.min.js"></script>`);
    serverState.registerExternalScript(`<script src="/platform-core/static/js/ag-grid.min.js"></script>`);

    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/ag-grid.css">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/antd.css">`);
    serverState.registerExternalStyle(`<link rel="stylesheet" type="text/css" href="/platform-core/static/css/index.css">`);

    serverState.registerClassInfo(_StringSqlDataType.classInfo);
    serverState.registerClassInfo(_IntegerSqlDataType.classInfo);
    serverState.registerClassInfo(_FkSqlDataType.classInfo);

    console.log("package platform-core: startup Ok");
}