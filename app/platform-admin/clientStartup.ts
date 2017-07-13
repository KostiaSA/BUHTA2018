import {appState} from "../platform-core/AppState";
import {SchemaAppDesignerPageTemplate} from "./pages/SchemaAppDesignerPageTemplate";
import {AdminMainPageTemplate} from "./pages/AdminMainPageTemplate";
import {SchemaObjectDesignerPageTemplate} from "./pages/SchemaObjectDesignerPageTemplate";
import {OpenSchemaObjectDesignerAction} from "./actions/OpenSchemaObjectDesignerAction";
import {SchemaTableDesignerPageTemplate} from "./pages/SchemaTableDesignerPageTemplate";
import {SchemaQueryDesignerPageTemplate} from "./pages/SchemaQueryDesignerPageTemplate";
import {SchemaObjectListPageTemplate} from "./pages/SchemaObjectListPageTemplate";
import {SchemaTable} from "../platform-core/schema/table/SchemaTable";
import {AdminConst} from "./AdminConst";
import {SchemaPage} from "../platform-core/schema/SchemaPage";
import {SchemaQuery} from "../platform-core/schema/query/SchemaQuery";

export async function clientStartup() {

    SchemaTable.classInfo.editOptions = {
        ...SchemaTable.classInfo.editOptions,
        editPageId: SchemaPage.classInfo.recordIdPrefix + ":" + AdminConst.SchemaTableDesignerPageObjectId

    };
    SchemaQuery.classInfo.editOptions = {
        ...SchemaQuery.classInfo.editOptions,
        editPageId: SchemaPage.classInfo.recordIdPrefix + ":" + AdminConst.SchemaQueryDesignerPageObjectId
    };

    appState.registerClassInfo(AdminMainPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaAppDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaTableDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaQueryDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectListPageTemplate.classInfo);

    appState.registerClassInfo(OpenSchemaObjectDesignerAction.classInfo);

    console.log("platform-admin startup ok")

}