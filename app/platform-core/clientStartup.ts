

import {appState} from "./AppState";
import {MainPageTemplate} from "./templates/MainPageTemplate";

export async function clientStartup() {
    appState.registerPageTemplate(MainPageTemplate);

}