import {ISchemaObjectProps} from "../schema/ISchemaObject";
import {schemaObjectModel} from "../schema/_schemaObjectModel";
import {parse} from "ejson";
import {serverState} from "./ServerState";

export class _SchemaObject<T extends ISchemaObjectProps> {
    static className = "app/platform-core/server/_SchemaObject";
    props: T = {} as any;
}


export async function _loadSchemaObject<T extends _SchemaObject<ISchemaObjectProps>>(id: string): Promise<T> {
    let instance = await schemaObjectModel.findByPrimary(id);
    if (instance) {
        let row = instance.get();
        let props = parse(row.jsonData) as ISchemaObjectProps;
        let objectClass = serverState.getRegisteredSchemaObject(props.className);
        let obj = new (objectClass as any)();
        obj.props = props;
        return obj;
    }
    else
        throw "Ошибка загрузки _SchemaObject ([" + id + "]): запись не найдена";
}

