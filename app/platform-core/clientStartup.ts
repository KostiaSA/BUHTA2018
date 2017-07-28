import {appState} from "./AppState";
import {MainPageTemplate} from "./pages/MainPageTemplate";
import {OpenSchemaPageAction} from "./actions/OpenSchemaPageAction";
import {MainMenuTemplate} from "./pages/MainMenuTemplate";
import {PageTemplate} from "./components/PageTemplate";
import {SchemaPage} from "./schema/SchemaPage";
import {SchemaApp} from "./schema/app/SchemaApp";
import {SchemaTable} from "./schema/table/SchemaTable";
import {StringSqlDataType} from "./schema/table/datatypes/StringSqlDataType";
import {IntegerSqlDataType} from "./schema/table/datatypes/IntegerSqlDataType";
import {FkSqlDataType} from "./schema/table/datatypes/FkSqlDataType";
import {SchemaQuery} from "./schema/query/SchemaQuery";
import {getSHA256base64Id} from "./utils/getSHA256base64Id";
import {SchemaForm} from "./schema/form/SchemaForm";
import {SchemaFormPageTemplate} from "./pages/SchemaFormPageTemplate";
import {SchemaDatabase} from "./schema/database/SchemaDatabase";
import {CoreConst} from "./CoreConst";
import {SchemaUserRole} from "./schema/user-role/SchemaUserRole";
import {SchemaMenu} from "./schema/menu/SchemaMenu";

export async function clientStartup() {

    const packageName = "platform-core";

    let fake = getSHA256base64Id(""); // не убирать

    appState.registerClassInfo(PageTemplate.classInfo);
    appState.registerClassInfo(MainPageTemplate.classInfo);
    appState.registerClassInfo(MainMenuTemplate.classInfo);
    appState.registerClassInfo(SchemaFormPageTemplate.classInfo);

    appState.registerClassInfo(OpenSchemaPageAction.classInfo);

    appState.registerClassInfo(SchemaPage.classInfo);
    appState.registerClassInfo(SchemaTable.classInfo);
    appState.registerClassInfo(SchemaApp.classInfo);
    appState.registerClassInfo(SchemaMenu.classInfo);
    appState.registerClassInfo(SchemaQuery.classInfo);
    appState.registerClassInfo(SchemaForm.classInfo);
    appState.registerClassInfo(SchemaDatabase.classInfo);
    appState.registerClassInfo(SchemaUserRole.classInfo);

    appState.registerClassInfo(StringSqlDataType.classInfo);
    appState.registerClassInfo(IntegerSqlDataType.classInfo);
    appState.registerClassInfo(FkSqlDataType.classInfo);

    appState.registerAccessRole({package: packageName, id: CoreConst.GuestAccessRoleId, title: "гость"});


    console.log("platform-core startup ok");
}