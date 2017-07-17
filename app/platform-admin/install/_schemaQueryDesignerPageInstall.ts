import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {AdminConst} from "../AdminConst";
import {SchemaPage} from "../../platform-core/schema/SchemaPage";
import {_SchemaPage} from "../../platform-core/server/schema/page/_SchemaPage";
import {ISchemaPageProps} from "../../platform-core/schema/ISchemaPage";
import {SchemaQueryDesignerPageTemplate} from "../pages/SchemaQueryDesignerPageTemplate";

export async function _schemaQueryDesignerPageInstall() {

    let pageProps:ISchemaPageProps = {
        id: SchemaPage.classInfo.recordIdPrefix+":"+AdminConst.SchemaQueryDesignerPageId,
        className: SchemaPage.classInfo.className,
        name: "Дизайнер SchemaQuery",
        title: "дизайнер запроса",
        description: "",
        template: SchemaQueryDesignerPageTemplate.classInfo.className,
        url: AdminConst.SchemaQueryDesignerPageUrl,
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
