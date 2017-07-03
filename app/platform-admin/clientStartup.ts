import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
import {AdminMainPageTemplate} from "./pages/AdminMainPageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./pages/SchemaObjectDesignerPageTemplate";
import {OpenSchemaObjectDesignerAction} from "./actions/OpenSchemaObjectDesignerAction";

export async function clientStartup() {
    appState.registerPageTemplate(AdminMainPageTemplate);
    appState.registerPageTemplate(SchemaObjectDesignerPageTemplate);
    appState.registerPageTemplate(SchemaAppDesignerPageTemplate as any);

    appState.registerAction(OpenSchemaObjectDesignerAction);

    console.log("platform-admin startup ok")

}