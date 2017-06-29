import {ISchemaObject} from "./ISchemaObject";
import {saveSchemaObjectApiRequest} from "./api/saveSchemaObjectApiRequest";
import {loadSchemaObjectApiRequest} from "./api/loadSchemaObjectApiRequest";

export class SchemaObject<T extends ISchemaObject> {
    props: T = {} as any;

    async save() {
        return saveSchemaObjectApiRequest({object: this.props})
    }

    async load(id: string) {
        this.props.id = id;
        // if (!this.props || !this.props.id)
        //     throw   "SchemaObject.load(): не заполнен props.id";
        this.props = (await loadSchemaObjectApiRequest({id: id})).object as any;
    }

}