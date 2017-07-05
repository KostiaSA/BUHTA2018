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

export async function clientStartup() {

    appState.registerPageTemplate(PageTemplate);
    appState.registerPageTemplate(MainPageTemplate);

    appState.registerMenuTemplate(MainMenuTemplate);

    appState.registerAction(OpenSchemaPageAction);

    appState.registerSchemaObject(SchemaPage);
    appState.registerSchemaObject(SchemaTable);
    appState.registerSchemaObject(SchemaApp);
    appState.registerSchemaObject(SchemaMenu);
    appState.registerSchemaObject(SchemaPage);

    appState.registerSqlDataType(StringSqlDataType);

    console.log("platform-core startup ok");
}