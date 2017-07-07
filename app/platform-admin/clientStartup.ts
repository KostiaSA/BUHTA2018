import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
import {AdminMainPageTemplate} from "./pages/AdminMainPageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./pages/SchemaObjectDesignerPageTemplate";
import {OpenSchemaObjectDesignerAction} from "./actions/OpenSchemaObjectDesignerAction";
import {SchemaTableDesignerPageTemplate} from "./pages/SchemaTableDesignerPageTemplate";
import {SchemaQueryDesignerPageTemplate} from "./pages/SchemaQueryDesignerPageTemplate";

export async function clientStartup() {
    appState.registerPageTemplate(AdminMainPageTemplate);
    appState.registerPageTemplate(SchemaObjectDesignerPageTemplate);
    appState.registerPageTemplate(SchemaAppDesignerPageTemplate);
    appState.registerPageTemplate(SchemaTableDesignerPageTemplate);
    appState.registerPageTemplate(SchemaQueryDesignerPageTemplate);

    appState.registerAction(OpenSchemaObjectDesignerAction);

    console.log("platform-admin startup ok")

}