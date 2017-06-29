

import {appState} from "./AppState";
import {MainPageTemplate} from "./templates/MainPageTemplate";
import {OpenSchemaPageAction} from "./actions/OpenSchemaPageAction";
import {MainMenuTemplate} from "./templates/MainMenuTemplate";

export async function clientStartup() {

    appState.registerPageTemplate(MainPageTemplate);

    appState.registerMenuTemplate(MainMenuTemplate);

    appState.registerAction(OpenSchemaPageAction);

    console.log("platform-core startup ok");
}