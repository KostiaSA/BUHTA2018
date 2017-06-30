import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
import {AdminMainPageTemplate} from "./pages/AdminMainPageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./pages/SchemaObjectDesignerPageTemplate";

export async function clientStartup() {
    appState.registerPageTemplate(AdminMainPageTemplate);
    appState.registerPageTemplate(SchemaObjectDesignerPageTemplate);
    appState.registerPageTemplate(SchemaAppDesignerPageTemplate);
    console.log("platform-admin startup ok")

}