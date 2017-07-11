import {appState} from "./AppState";
import {MainPageTemplate} from "./templates/MainPageTemplate";
import {OpenSchemaPageAction} from "./actions/OpenSchemaPageAction";
import {MainMenuTemplate} from "./templates/MainMenuTemplate";
import {PageTemplate} from "./components/PageTemplate";
import {SchemaPage} from "./schema/SchemaPage";
import {SchemaApp} from "./schema/SchemaApp";
import {SchemaMenu} from "./schema/SchemaMenu";
import {SchemaTable} from "./schema/table/SchemaTable";
import {StringSqlDataType} from "./schema/table/StringSqlDataType";
import {IntegerSqlDataType} from "./schema/table/IntegerSqlDataType";
import {FkSqlDataType} from "./schema/table/FkSqlDataType";
import {SchemaQuery} from "./schema/query/SchemaQuery";

export async function clientStartup() {

    appState.registerClassInfo(PageTemplate.classInfo);
    appState.registerClassInfo(MainPageTemplate.classInfo);

    appState.registerClassInfo(MainMenuTemplate.classInfo);

    appState.registerAction(OpenSchemaPageAction);

    appState.registerClassInfo(SchemaPage.classInfo);
    appState.registerClassInfo(SchemaTable.classInfo);
    appState.registerClassInfo(SchemaApp.classInfo);
    appState.registerClassInfo(SchemaMenu.classInfo);
    appState.registerClassInfo(SchemaQuery.classInfo);

    appState.registerSqlDataType(StringSqlDataType);
    appState.registerSqlDataType(IntegerSqlDataType);
    appState.registerSqlDataType(FkSqlDataType);

    console.log("platform-core startup ok");
}