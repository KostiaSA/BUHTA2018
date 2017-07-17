import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps";
import {_SchemaQuery} from "../../platform-core/server/schema/query/_SchemaQuery";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {CoreConst} from "../../platform-core/CoreConst";
import {AdminConst} from "../AdminConst";
import {SchemaPage} from "../../platform-core/schema/SchemaPage";
import {SchemaTableDesignerPageTemplate} from "../pages/SchemaTableDesignerPageTemplate";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";
import {_SchemaPage} from "../../platform-core/server/schema/page/_SchemaPage";
import {ISchemaPageProps} from "../../platform-core/schema/ISchemaPage";
import {_loadSchemaObject} from "../../platform-core/server/schema/_SchemaObject";
import {_SchemaTable} from "../../platform-core/server/schema/table/_SchemaTable";
import {SchemaAddNewObjectPageTemplate} from "../pages/SchemaAddNewObjectPageTemplate";

export async function _schemaAddNewObjectPageInstall() {

    let pageProps: ISchemaPageProps = {
        id: SchemaPage.classInfo.recordIdPrefix + ":" + AdminConst.SchemaAddNewObjectPageId,
        className: SchemaPage.classInfo.className,
        name: "Создание нового объекта конфигурации",
        title: "Создание нового объекта конфигурации",
        description: "",
        template: SchemaAddNewObjectPageTemplate.classInfo.className,
        url: AdminConst.SchemaAddNewObjectPageUrl,
        //mainMenuId: mainmenu.id
    };

    let page = new _SchemaPage(pageProps);

    try {
        await page.save();
        console.log("создана страница '" + pageProps.name + "'");

    }
    catch (error) {
        console.error(error);
    }

    try {
        let schemaObjectTable = await _loadSchemaObject<_SchemaTable>(SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaTable_TableId);
        schemaObjectTable.props.editOptions = {
            ...schemaObjectTable.props.editOptions,
            addPageId: pageProps.id
        };
        await schemaObjectTable.save();
        console.log("страница прописана в SchemaObject");

    }
    catch (error) {
        console.error(error);
    }

}
