import {ISchemaObject} from "./ISchemaObject";
import {saveSchemaObjectApiRequest} from "./api/saveSchemaObjectApiRequest";

export class SchemaObject<T extends ISchemaObject> {
    props: T;

    async save() {
        return saveSchemaObjectApiRequest({object: this.props})
    }

    async load() {
        //this.props= await saveSchemaObjectApiRequest({object: })
    }

}