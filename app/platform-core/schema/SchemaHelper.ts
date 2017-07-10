import {SchemaObject} from "./SchemaObject";
import {ISchemaObjectProps} from "./ISchemaObject";
import {loadSchemaObjectApiRequest} from "./api/loadSchemaObjectApiRequest";
import {appState} from "../AppState";

export class SchemaHelper {

    static async getSchemaObjectProps<T extends ISchemaObjectProps>(objectId: string): Promise<T> {
        let props = (await loadSchemaObjectApiRequest({id: objectId})).object as T;
        return props;
    }

    static async getSchemaObjectName(objectId: string): Promise<string> {
        let props = await SchemaHelper.getSchemaObjectProps(objectId);
        return props.name;
    }

    static async createSchemaObject<T extends SchemaObject<ISchemaObjectProps>>(objectId: string): Promise<T> {

        let props = await SchemaHelper.getSchemaObjectProps(objectId);
        let objectClass = appState.getRegisteredSchemaObject(props.className);

        let obj = new (objectClass as any)();
        obj.props = props;
        return obj;
    }
}