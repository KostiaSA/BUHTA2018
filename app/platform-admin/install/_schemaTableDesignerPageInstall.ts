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

export async function _schemaTableDesignerPageInstall() {


    // ------------------ SchemaTable организация ------------------
    let pageProps:ISchemaPageProps = {
        id: SchemaPage.classInfo.recordIdPrefix+":"+AdminConst.SchemaTableDesignerPageId,
        className: SchemaPage.classInfo.className,
        name: "Дизайнер SchemaTable",
        title: "дизайнер таблицы",
        description: "",
        template: SchemaTableDesignerPageTemplate.classInfo.className,
        url: AdminConst.SchemaTableDesignerPageUrl,
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

}
