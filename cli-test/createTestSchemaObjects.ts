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
        label: "Открой 2A2B0CFFC047",
        action: {
            actionId: "platform-core/actions/OpenSchemaPageAction",
            pageId: "2A2B0CFFC047"
        } as IOpenSchemaPageAction
    };
    let menuItem2: ISchemaMenuItem = {
        label: "Закрой 31CA8AEB0552",
        action: {
            actionId: "platform-core/actions/OpenSchemaPageAction",
            pageId: "31CA8AEB0552"
        } as IOpenSchemaPageAction
    };
    let menuItem3: ISchemaMenuItem = {
        label: "дизайнер APP",
        action: {
            actionId: "platform-core/actions/OpenSchemaPageAction",
            pageId: "777A8AEB0552"
        } as IOpenSchemaPageAction
    };

    let mainmenu: ISchemaMenu = {
        id: "EC69BFBB1D35",
        type: "SchemaMenu",
        name: "тестовое главное меню",
        description: "---",
        template: "platform-core/templates/MainMenuTemplate",
        items: [menuItem1, menuItem2, menuItem3]
    };

    let result = await _saveSchemaObjectApiResponse({object: mainmenu});
    console.log(result.error || "создана '" + mainmenu.name + "'");

    // ------------------ startPage ------------------
    let startPage: ISchemaPage = {
        id: "2A2B0CFFC047",
        type: "SchemaPage",
        name: "стартовая страница",
        title: "стартовая страница N2A2B0CFFC047",
        description: "",
//        template: "platform-core/templates/MainPageTemplate",
        //template: "platform-admin/pages/SchemaObjectDesignerPageTemplate",
        //template: "platform-admin/pages/AdminMainPageTemplate",
        template: "platform-admin/pages/SchemaAppDesignerPageTemplate",
        mainMenuId: mainmenu.id,
        url:"/"
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



    // ------------------ Page 2 ------------------
    let page2: ISchemaPage = {
        id: "31CA8AEB0552",
        type: "SchemaPage",
        name: "страница 2",
        title: "страница 2 N31CA8AEB0552",
        description: "",
        template: "platform-core/templates/MainPageTemplate",
        url:"/page2",
        mainMenuId: mainmenu.id
    }

    result = await _saveSchemaObjectApiResponse({object: page2});
    console.log(result.error || "создана '" + page2.name + "'");

    // ------------------ Дизайнер SchemaApp ------------------
    let page3: ISchemaPage = {
        id: "777A8AEB0552",
        type: "SchemaPage",
        name: "Дизайнер SchemaApp",
        title: "страница 777A8AEB0552 Дизайнер SchemaApp",
        description: "",
        template: "platform-admin/pages/SchemaAppDesignerPageTemplate",
        url:"admin/schema-app-designer"
        //mainMenuId: mainmenu.id
    };

    result = await _saveSchemaObjectApiResponse({object: page3});
    console.log(result.error || "создана '" + page3.name + "'");
}

createTestSchemaObjects().then(() => {
    process.exit(0);
});