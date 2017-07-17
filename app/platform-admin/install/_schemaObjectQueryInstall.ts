import {ISchemaQueryProps} from "../../platform-core/schema/query/ISchemaQueryProps";
import {_SchemaQuery} from "../../platform-core/server/schema/query/_SchemaQuery";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {CoreConst} from "../../platform-core/CoreConst";
import {AdminConst} from "../AdminConst";
import {SchemaTable} from "../../platform-core/schema/table/SchemaTable";

export async function _schemaObjectQueryInstall() {


    // ------------------ SchemaTable организация ------------------
    let queryProps: ISchemaQueryProps = {

        id: SchemaQuery.classInfo.recordIdPrefix+":"+ AdminConst.SchemaObjectListQueryId,
        key: "ODNhMGI4MWFiZTZjYTRk",
        className: SchemaQuery.classInfo.className,
        name: "Список объектов конфигурации",
        description: "Запрос список объектов конфигурации",
        tableId: SchemaTable.classInfo.recordIdPrefix+":"+CoreConst.SchemaTable_TableId,
        children: [
            {
                "key": "j5jdo0xqqm4u2p4xn7p5",
                "fieldCaption": "className",
                "fieldSource": "className",
                "tableId": SchemaTable.classInfo.recordIdPrefix+":"+CoreConst.SchemaObjectTypeTableObjectId,
                "children": [
                    {
                        "key": "ijzwsjc3opdfmsj34dxb",
                        "fieldCaption": "Тип объекта",
                        "fieldSource": "title"
                    }
                ]
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
