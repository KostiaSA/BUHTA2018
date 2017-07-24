import {ISchemaPageProps} from "../app/platform-core/schema/ISchemaPage";
import {_saveSchemaObjectApiResponse} from "../app/platform-core/schema/api/_saveSchemaObjectApiResponse";
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
import {MainMenuTemplate} from "../app/platform-core/pages/MainMenuTemplate";
import {MainPageTemplate} from "../app/platform-core/pages/MainPageTemplate";
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

export async function create_Организация_query() {
    //await _sequelizeInit();

    // ------------------ SchemaQuery организация ------------------
    let query1: ISchemaQueryProps = {
        id: "schema-query:org9834rt35788AF517DDE",
        key: "1",
        className: SchemaQuery.classInfo.className,
        name: "Запрос список организаций",
        description: "Запрос список организаций desc",
        tableId: "schema-table:db93rN1PNn0kVfqMRtY3",
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
                key: "17",
                fieldCaption: "ИНН",
                fieldSource: "ИНН"
            },
        ]
    };

    await new _SchemaQuery(query1).save();
///    result = await _saveSchemaObjectApiResponse({object: query1});
    console.log("создана '" + query1.name + "'");
}

create_Организация_query().then(() => {
    process.exit(0);
});