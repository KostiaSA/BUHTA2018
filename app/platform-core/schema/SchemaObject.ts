import {ISchemaObjectProps} from "./ISchemaObject";
import {saveSchemaObjectApiRequest} from "./api/saveSchemaObjectApiRequest";
import {loadSchemaObjectApiRequest} from "./api/loadSchemaObjectApiRequest";
import {appState} from "../AppState";

export class SchemaObject<T extends ISchemaObjectProps> {
    props: T = {} as any;

    static className="platform-core/schema/SchemaObject";
    static designerUrl="admin/schema-object-designer";

    async save() {
        return saveSchemaObjectApiRequest({object: this.props})
    }

    // async load(id: string) {
    //     this.props.id = id;
    //     // if (!this.props || !this.props.id)
    //     //     throw   "SchemaObject.load(): не заполнен props.id";
    //     this.props = (await loadSchemaObjectApiRequest({id: id})).object as any;
    // }

}


export async function createSchemaObject<T extends SchemaObject<ISchemaObjectProps>>(objectId: string): Promise<T> {

    let props = (await loadSchemaObjectApiRequest({id: objectId})).object as ISchemaObjectProps;
    let objectClass = appState.getRegisteredSchemaObject(props.className);

    let obj = new (objectClass as any)();
    obj.props = props;
    return obj;
}