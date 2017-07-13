import {ISchemaPageProps} from "../app/platform-core/schema/ISchemaPage";
import {_saveSchemaObjectApiResponse} from "../app/platform-core/schema/api/_saveSchemaObjectApiResponse";
import {_sequelizeInit} from "../app/platform-core/server/_sequelize";
import {ISchemaAppProps} from "../app/platform-core/schema/ISchemaApp";
import {ISchemaMenuProps, ISchemaMenuItem} from "../app/platform-core/schema/ISchemaMenu";
import {IOpenSchemaPageAction} from "../app/platform-core/actions/IOpenSchemaPageAction";
import {SchemaMenu} from "../app/platform-core/schema/SchemaMenu";
import {SchemaPage} from "../app/platform-core/schema/SchemaPage";
import {SchemaApp} from "../app/platform-core/schema/SchemaApp";
import {
    IOpenSchemaObjectDesignerActionProps,
    OpenSchemaObjectDesignerAction
} from "../app/platform-admin/actions/OpenSchemaObjectDesignerAction";
import {OpenSchemaPageAction} from "../app/platform-core/actions/OpenSchemaPageAction";
import {MainMenuTemplate} from "../app/platform-core/templates/MainMenuTemplate";
import {MainPageTemplate} from "../app/platform-core/templates/MainPageTemplate";
import {SchemaTable} from "../app/platform-core/schema/table/SchemaTable";
import {ISchemaTableProps} from "../app/platform-core/schema/table/ISchemaTableProps";
import {SchemaTableDesignerPageTemplate} from "../app/platform-admin/pages/SchemaTableDesignerPageTemplate";
import {StringSqlDataType} from "../app/platform-core/schema/table/datatypes/StringSqlDataType";
import {ISchemaQueryProps} from "../app/platform-core/schema/query/ISchemaQueryProps";
import {SchemaQuery} from "../app/platform-core/schema/query/SchemaQuery";
import {SchemaQueryDesignerPageTemplate} from "../app/platform-admin/pages/SchemaQueryDesignerPageTemplate";
import {_SchemaQuery} from "../app/platform-core/server/schema/query/_SchemaQuery";
import {_SchemaPage} from "../app/platform-core/server/schema/page/_SchemaPage";
import {SchemaAppDesignerPageTemplate} from "../app/platform-admin/pages/SchemaAppDesignerPageTemplate";

export async function createTestSchemaObjects() {
    await _sequelizeInit();

    // ------------------ mainmenu ------------------
    let menuItem1: ISchemaMenuItem = {
        label: "Открой 2A2B0CFFC047",
        action: {
            actionClassName: OpenSchemaPageAction.classInfo.className,
            pageId: "2A2B0CFFC047"
        } as IOpenSchemaPageAction
    };
    let menuItem2: ISchemaMenuItem = {
        label: "Закрой 31CA8AEB0552",
        action: {
            actionClassName: OpenSchemaPageAction.classInfo.className,
            pageId: "31CA8AEB0552"
        } as IOpenSchemaPageAction
    };
    let menuItem3: ISchemaMenuItem = {
        label: "дизайнер APP да",
        action: {
            actionClassName: OpenSchemaObjectDesignerAction.classInfo.className,
            objectId: "4FD8AF410DDE"
        } as IOpenSchemaObjectDesignerActionProps
    };
    let menuItem4: ISchemaMenuItem = {
        label: "дизайнер ТАБЛИЦЫ",
        action: {
            actionClassName: OpenSchemaObjectDesignerAction.classInfo.className,
            objectId: "WG9lq9AjR9Erxw33AElM"
        } as IOpenSchemaObjectDesignerActionProps
    };
    let menuItem5: ISchemaMenuItem = {
        label: "дизайнер ЗАПРОСА",
        action: {
            actionClassName: OpenSchemaObjectDesignerAction.classInfo.className,
            objectId: "7788AF517DDE"
        } as IOpenSchemaObjectDesignerActionProps
    };

    let mainmenu: ISchemaMenuProps = {
        id: "EC69BFBB1D35",
        className: SchemaMenu.classInfo.className,
        name: "тестовое главное меню",
        description: "---",
        template: MainMenuTemplate.classInfo.className,// "platform-core/templates/MainMenuTemplate",
        items: [menuItem1, menuItem2, menuItem3, menuItem4, menuItem5]
    };

    let result = await _saveSchemaObjectApiResponse({object: mainmenu});
    console.log(result.error || "создана '" + mainmenu.name + "'");

    // ------------------ startPage ------------------
    let startPage: ISchemaPageProps = {
        id: "2A2B0CFFC047",
        className: SchemaPage.classInfo.className,
        name: "стартовая страница",
        title: "стартовая страница N2A2B0CFFC047",
        description: "",
        template: MainPageTemplate.classInfo.className,// "platform-core/templates/MainPageTemplate",
        //template: "platform-admin/pages/SchemaObjectDesignerPageTemplate",
        //template: "platform-admin/pages/AdminMainPageTemplate",
        //template: "platform-admin/pages/SchemaAppDesignerPageTemplate",
        mainMenuId: mainmenu.id,
        url: "/"
    }

    result = await _saveSchemaObjectApiResponse({object: startPage});
    console.log(result.error || "создана '" + startPage.name + "'");

    // ------------------ SchemaApp ------------------
    let app: ISchemaAppProps = {
        id: "4FD8AF410DDE",
        className: SchemaApp.classInfo.className,
        name: "тестовое приложение",
        description: "",
        startPage: startPage.id
    }

    result = await _saveSchemaObjectApiResponse({object: app});
    console.log(result.error || "создана '" + app.name + "'");


    // ------------------ Page 2 ------------------
    let page2: ISchemaPageProps = {
        id: "31CA8AEB0552",
        className: SchemaPage.classInfo.className,
        name: "страница 2",
        title: "страница 2 N31CA8AEB0552",
        description: "",
        template: "platform-core/templates/MainPageTemplate",
        url: "/page2",
        mainMenuId: mainmenu.id
    }

    result = await _saveSchemaObjectApiResponse({object: page2});
    console.log(result.error || "создана '" + page2.name + "'");

    // ------------------ Дизайнер SchemaApp ------------------
    let page3: ISchemaPageProps = {
        id: "777A8AEB0552",
        className: SchemaPage.classInfo.className,
        name: "Дизайнер SchemaApp",
        title: "страница 777A8AEB0552 Дизайнер SchemaApp",
        description: "",
        template: SchemaAppDesignerPageTemplate.classInfo.className,
        url: "SchemaApp.classInfo.designerUrl"
        //mainMenuId: mainmenu.id
    };

    result = await _saveSchemaObjectApiResponse({object: page3});
    console.log(result.error || "создана '" + page3.name + "'");


    // ------------------ SchemaTable организация ------------------
    let orgTable: ISchemaTableProps = {
        id: "8563AF517DDE",
        className: SchemaTable.classInfo.className,
        name: "Организация",
        description: "таблица организация",
        columns: [
            // {
            //     name: "номер",
            //     className:StringSqlDataType.className,
            //     dataType: StringSqlDataType.className,
            // },
            // {
            //     name: "название",
            //     className:StringSqlDataType.className,
            //     dataType: StringSqlDataType.className,
            // }
        ]
    };

    result = await _saveSchemaObjectApiResponse({object: orgTable});
    console.log(result.error || "создана '" + orgTable.name + "'");

    // ------------------ Дизайнер SchemaTable ------------------
    let page4: ISchemaPageProps = {
        id: "2E5102700AFB",
        className: SchemaPage.classInfo.className,
        name: "Дизайнер SchemaTable",
        title: "дизайнер таблицы",
        description: "",
        template: SchemaTableDesignerPageTemplate.classInfo.className,
        url: "SchemaTable.classInfo.designerUrl"
        //mainMenuId: mainmenu.id
    };

    result = await _saveSchemaObjectApiResponse({object: page4});
    console.log(result.error || "создана '" + page4.name + "'");


    // ------------------ SchemaQuery организация ------------------
    let query1: ISchemaQueryProps = {
        id: "7788AF517DDE",
        key: "1",
        className: SchemaQuery.classInfo.className,
        name: "Запрос список организаций",
        description: "Запрос список организаций desc",
        tableId: "db93rN1PNn0kVfqMRtY3",
        children: [
            {
                key: "13",
                fieldCaption: "Номер",
                fieldSource: "Номер"
            },
            {
                key: "15",
                fieldCaption: "Название",
                fieldSource: "Название"
            },
            {
                key: "135",
                fieldCaption: "Отвественный",
                fieldSource: "Отвественный",
                tableId: "WG9lq9AjR9Erxw33AElM",
                children: [
                    {
                        key: "1663",
                        fieldCaption: "Фамилия",
                        fieldSource: "Фамилия"
                    },
                    {
                        key: "1588",
                        fieldCaption: "Имя",
                        fieldSource: "Имя"
                    }
                ]
            },
        ]
    };

    await new _SchemaQuery(query1).save();
///    result = await _saveSchemaObjectApiResponse({object: query1});
    console.log(result.error || "создана '" + query1.name + "'");


    // ------------------ Дизайнер SchemaQuery ------------------
    let page5: ISchemaPageProps = {
        id: "qwdrrf2E5102700AFB",
        className: SchemaPage.classInfo.className,
        name: "Дизайнер SchemaQuery",
        title: "дизайнер запроса",
        description: "",
        template: SchemaQueryDesignerPageTemplate.classInfo.className,
        url: "SchemaQuery.classInfo.designerUrl"
        //mainMenuId: mainmenu.id
    };

    //result = await _saveSchemaObjectApiResponse({object: page5});
    await new _SchemaPage(page5).save();
    console.log( "создана '" + page5.name + "'");

}

createTestSchemaObjects().then(() => {
    process.exit(0);
});