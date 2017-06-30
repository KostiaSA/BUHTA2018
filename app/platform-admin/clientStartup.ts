


import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
export async function clientStartup() {
    appState.registerPageTemplate(SchemaAppDesignerPageTemplate);
    console.log("platform-admin startup ok")

}