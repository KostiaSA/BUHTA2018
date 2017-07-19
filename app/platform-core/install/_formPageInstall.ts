import {ISchemaPageProps} from "../../platform-core/schema/ISchemaPage";
import {_SchemaPage} from "../../platform-core/server/schema/page/_SchemaPage";
import {SchemaPage} from "../../platform-core/schema/SchemaPage";
import {CoreConst} from "../CoreConst";
import {SchemaFormPageTemplate} from "../pages/SchemaFormPageTemplate";

export async function _formPageInstall() {


    let pageProps: ISchemaPageProps = {
        id: _SchemaPage.classInfo.recordIdPrefix+":"+CoreConst.FormPageObjectId,
        className: SchemaPage.classInfo.className,
        name: "Редактирование записи (через SchemaForm)",
        title: "Редактирование записи (через SchemaForm)",
        description: "Редактирование записи (через SchemaForm)",
        template: SchemaFormPageTemplate.classInfo.className,
        url: "/table-row-editor",
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
