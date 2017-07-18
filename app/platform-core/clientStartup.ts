import {appState} from "./AppState";
import {MainPageTemplate} from "./templates/MainPageTemplate";
import {OpenSchemaPageAction} from "./actions/OpenSchemaPageAction";
import {MainMenuTemplate} from "./templates/MainMenuTemplate";
import {PageTemplate} from "./components/PageTemplate";
import {SchemaPage} from "./schema/SchemaPage";
import {SchemaApp} from "./schema/SchemaApp";
import {SchemaMenu} from "./schema/SchemaMenu";
import {SchemaTable} from "./schema/table/SchemaTable";
import {StringSqlDataType} from "./schema/table/datatypes/StringSqlDataType";
import {IntegerSqlDataType} from "./schema/table/datatypes/IntegerSqlDataType";
import {FkSqlDataType} from "./schema/table/datatypes/FkSqlDataType";
import {SchemaQuery} from "./schema/query/SchemaQuery";
import {getSHA256base64Id} from "./utils/getSHA256base64Id";
import {SchemaForm} from "./schema/form/SchemaForm";

export async function clientStartup() {
    let fake= getSHA256base64Id(""); // не убирать

    appState.registerClassInfo(PageTemplate.classInfo);
    appState.registerClassInfo(MainPageTemplate.classInfo);

    appState.registerClassInfo(MainMenuTemplate.classInfo);

    appState.registerClassInfo(OpenSchemaPageAction.classInfo);

    appState.registerClassInfo(SchemaPage.classInfo);
    appState.registerClassInfo(SchemaTable.classInfo);
    appState.registerClassInfo(SchemaApp.classInfo);
    appState.registerClassInfo(SchemaMenu.classInfo);
    appState.registerClassInfo(SchemaQuery.classInfo);
    appState.registerClassInfo(SchemaForm.classInfo);

    appState.registerClassInfo(StringSqlDataType.classInfo);
    appState.registerClassInfo(IntegerSqlDataType.classInfo);
    appState.registerClassInfo(FkSqlDataType.classInfo);

    console.log("platform-core startup ok");
}