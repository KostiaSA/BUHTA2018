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
import {SchemaAddNewObjectPageTemplate} from "./pages/SchemaAddNewObjectPageTemplate";

export async function clientStartup() {
    const packageName = "platform-admin";

    SchemaTable.classInfo.editOptions = {
        ...SchemaTable.classInfo.editOptions,
        editPageId: SchemaPage.classInfo.recordIdPrefix + ":" + AdminConst.SchemaTableDesignerPageId

    };
    SchemaQuery.classInfo.editOptions = {
        ...SchemaQuery.classInfo.editOptions,
        editPageId: SchemaPage.classInfo.recordIdPrefix + ":" + AdminConst.SchemaQueryDesignerPageId
    };

    appState.registerClassInfo(AdminMainPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaAppDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaTableDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaQueryDesignerPageTemplate.classInfo);
    appState.registerClassInfo(SchemaObjectListPageTemplate.classInfo);

    appState.registerClassInfo(SchemaAddNewObjectPageTemplate.classInfo);

    appState.registerClassInfo(OpenSchemaObjectDesignerAction.classInfo);


    appState.registerAccessRole({package: packageName, id: AdminConst.AdminAccessRoleId, title: "админ"});

    console.log("platform-admin startup ok")

}