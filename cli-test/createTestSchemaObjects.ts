import {ISchemaPage} from "../app/platform-core/schema/ISchemaPage";
import {_saveSchemaObjectApiResponse} from "../app/platform-core/schema/api/_saveSchemaObjectApiResponse";
import {_sequelizeInit} from "../app/platform-core/server/_sequelize";
import {ISchemaApp} from "../app/platform-core/schema/ISchemaApp";
import {ISchemaMenu, ISchemaMenuItem} from "../app/platform-core/schema/ISchemaMenu";
import {IOpenSchemaPageAction} from "../app/platform-core/actions/IOpenSchemaPageAction";

export async function createTestSchemaObjects() {
    await _sequelizeInit();

    // ------------------ mainmenu ------------------
    let menuItem1: ISchemaMenuItem = {
        label:"Открой меня",
        action:{
            actionId: "platform-core/action/OpenSchemaPageAction",
            pageId: "2A2B0CFFC047"
        } as IOpenSchemaPageAction
    };

    let mainmenu: ISchemaMenu = {
        id: "EC69BFBB1D35",
        type: "SchemaMenu",
        name: "тестовое главное меню",
        description: "---",
        template:"platform-core/templates/MainMenuTemplate",
        items: [menuItem1]
    };

    let result = await _saveSchemaObjectApiResponse({object: mainmenu});
    console.log(result.error || "создана '" + mainmenu.name + "'");

    // ------------------ startPage ------------------
    let startPage: ISchemaPage = {
        id: "2A2B0CFFC047",
        type: "SchemaPage",
        name: "стартовая страница",
        description: "",
        template: "platform-core/templates/MainPageTemplate",
        mainMenuId:mainmenu.id
    }

    result = await _saveSchemaObjectApiResponse({object: startPage});
    console.log(result.error || "создана '" + startPage.name + "'");

    let app: ISchemaApp = {
        id: "4FD8AF410DDE",
        type: "SchemaApp",
        name: "тестовое приложение",
        description: "",
        startPage: startPage.id
    }

    result = await _saveSchemaObjectApiResponse({object: app});
    console.log(result.error || "создана '" + app.name + "'");



}

createTestSchemaObjects().then(() => {
    process.exit(0);
});