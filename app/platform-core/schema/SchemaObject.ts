import {ISchemaObject} from "./ISchemaObject";
import {saveSchemaObjectApiRequest} from "./api/saveSchemaObjectApiRequest";
import {loadSchemaObjectApiRequest} from "./api/loadSchemaObjectApiRequest";

export class SchemaObject<T extends ISchemaObject> {
    props: T;

    async save() {
        return saveSchemaObjectApiRequest({object: this.props})
    }

    async load() {
        this.props = (await loadSchemaObjectApiRequest({id: this.props.id})).object as any;
    }

}