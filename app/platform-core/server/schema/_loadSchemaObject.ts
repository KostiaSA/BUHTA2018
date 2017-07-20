import {_SchemaObject} from "./_SchemaObject";
import {ISchemaObjectProps} from "../../schema/ISchemaObject";
import {SchemaDatabase} from "../../schema/database/SchemaDatabase";
import {CoreConst} from "../../CoreConst";
import {_SchemaDatabase} from "./database/_SchemaDatabase";
import {_config} from "../../../../_config";
import {schemaObjectModel} from "../../schema/_schemaObjectModel";
import {parse} from "ejson";
import {serverState} from "../ServerState";

export async function _loadSchemaObject<T extends _SchemaObject<ISchemaObjectProps>>(id: string): Promise<T> {

    if (id === SchemaDatabase.classInfo.recordIdPrefix + ":" + CoreConst.Schema_DatabaseId) {
        let obj = new _SchemaDatabase();
        obj.props = {
            id: id,
            name: "schema",
            className: SchemaDatabase.classInfo.className,
            description: "",
            sqlDialect: _config.sqlDialect,
            sqlServerAddress: _config.sqlServerAddress,
            sqlServerInstance: _config.sqlServerInstance,
            sqlServerPort: _config.sqlServerPort,
            sqlDatabase: _config.sqlDatabase,
            sqlLogin: _config.sqlLogin,
            sqlPassword: _config.sqlPassword,
        };

        // todo странное any ???
        return obj as any;
    }
    else {
        let instance = await schemaObjectModel.findByPrimary(id);
        if (instance) {
            let row = instance.get();
            let props = parse(row.jsonData) as ISchemaObjectProps;
            let objectClass = serverState.getRegisteredClassInfo(props.className).constructor;
            let obj = new objectClass();
            obj.props = props;
            return obj;
        }
        else
            throw "Ошибка загрузки _SchemaObject (id:" + id + "): запись не найдена";
    }
}

