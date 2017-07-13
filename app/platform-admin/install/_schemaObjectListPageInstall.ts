import {AdminConst} from "../AdminConst";
import {ISchemaPageProps} from "../../platform-core/schema/ISchemaPage";
import {_SchemaPage} from "../../platform-core/server/schema/page/_SchemaPage";
import {SchemaPage} from "../../platform-core/schema/SchemaPage";
import {SchemaObjectListPageTemplate} from "../pages/SchemaObjectListPageTemplate";

export async function _schemaObjectListPageInstall() {


    let pageProps: ISchemaPageProps = {
        id: _SchemaPage.classInfo.recordIdPrefix+":"+AdminConst.SchemaObjectListPageObjectId,
        className: SchemaPage.classInfo.className,
        name: "Просмотр списка объектов конфигурации",
        title: "Список объектов конфигурации",
        description: "Просмотр списка объектов конфигурации",
        template: SchemaObjectListPageTemplate.classInfo.className,
        url: "/admin",
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
