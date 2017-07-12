import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
import {AdminMainPageTemplate} from "./pages/AdminMainPageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./pages/SchemaObjectDesignerPageTemplate";
import {OpenSchemaObjectDesignerAction} from "./actions/OpenSchemaObjectDesignerAction";
import {SchemaTableDesignerPageTemplate} from "./pages/SchemaTableDesignerPageTemplate";
import {SchemaQueryDesignerPageTemplate} from "./pages/SchemaQueryDesignerPageTemplate";
import {SchemaObjectListPageTemplate} from "./pages/SchemaObjectListPageTemplate";

export async function clientStartup() {
    appState.registerClassInfo(AdminMainPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaAppDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaTableDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaQueryDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectListPageTemplate.classInfo);

    appState.registerClassInfo(OpenSchemaObjectDesignerAction.classInfo);

    console.log("platform-admin startup ok")

}