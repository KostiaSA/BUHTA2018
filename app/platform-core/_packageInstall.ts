import {_schemaObjectTableInstall} from "./install/_schemaObjectTableInstall";
import {_serverStartup} from "./_serverStartup";
import {_schemaObjectTypeTableInstall} from "./install/_schemaObjectTypeTableInstall";
import {_SchemaTable} from "./server/schema/table/_SchemaTable";
import {_loadSchemaObject} from "./server/schema/_SchemaObject";
import {CoreConst} from "./CoreConst";
import {_SchemaQuery} from "./server/schema/query/_SchemaQuery";
import {_SchemaPage} from "./server/schema/page/_SchemaPage";
import {_formPageInstall} from "./install/_formPageInstall";

export async function packageInstall() {
    await _serverStartup();

    await _schemaObjectTypeTableInstall();
    await _schemaObjectTableInstall();

    let objectTypeTable = await _loadSchemaObject<_SchemaTable>(_SchemaTable.classInfo.recordIdPrefix + ":" + CoreConst.SchemaObjectTypeTableObjectId);
    await objectTypeTable.upsertRows([
        {
            objectClassName: _SchemaTable.classInfo.className,
            title: _SchemaTable.classInfo.title,
            prefix: _SchemaTable.classInfo.recordIdPrefix,
        },
        {
            objectClassName: _SchemaQuery.classInfo.className,
            title: _SchemaQuery.classInfo.title,
            prefix: _SchemaQuery.classInfo.recordIdPrefix,
        },
        {
            objectClassName: _SchemaPage.classInfo.className,
            title: _SchemaPage.classInfo.title,
            prefix: _SchemaPage.classInfo.recordIdPrefix,
        },
    ]);

    await _formPageInstall();

}

packageInstall().then(() => {
    process.exit(0);
});