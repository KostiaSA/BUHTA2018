import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps";
import {_SchemaQuery} from "../../platform-core/server/schema/query/_SchemaQuery";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {CoreConst} from "../../platform-core/CoreConst";
import {AdminConst} from "../AdminConst";

export async function _schemaObjectQueryInstall() {


    // ------------------ SchemaTable организация ------------------
    let queryProps: ISchemaQueryProps = {

        id: AdminConst.SchemaTableQueryObjectId,
        key: "ODNhMGI4MWFiZTZjYTRk",
        className: SchemaQuery.classInfo.className,
        name: "Список объектов конфигурации",
        description: "Запрос список объектов конфигурации",
        tableId: CoreConst.SchemaTableObjectId,
        children: [
            {
                "key": "MDU4ODdjZmVmZjIyNzdj",
                "fieldSource": "id",
                "fieldCaption": "id"
            },
            {
                "key": "MGQ2ODExYzQxZjMzNDFl",
                "fieldSource": "name",
                "fieldCaption": "Название"
            },
            {
                "key": "ZjMzMjQyNWU0ZGFiYzNi",
                "fieldSource": "description",
                "fieldCaption": "Описание"
            },
            {
                "key": "ZjMyZjc0Yjk5NGQxOWM5",
                "fieldSource": "className",
                "fieldCaption": "тип"
            },
        ]
    };

    let query = new _SchemaQuery(queryProps);

    try {
        await query.save();
        console.log("создан запрос '" + queryProps.name + "'");

    }
    catch (error) {
        console.error(error);
    }

}
