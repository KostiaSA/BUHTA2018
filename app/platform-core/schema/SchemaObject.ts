import {ISchemaObjectProps} from "./ISchemaObject";
import {saveSchemaObjectApiRequest} from "./api/saveSchemaObjectApiRequest";
import {loadSchemaObjectApiRequest} from "./api/loadSchemaObjectApiRequest";
import {appState} from "../AppState";
import {IClassInfo} from "../IClassInfo";

export interface ISchemaObjectClassInfo<T> extends IClassInfo<T> {

}

export class SchemaObject<T extends ISchemaObjectProps> {
    props: T = {} as any;

//    static className = "platform-core:SchemaObject";
//    static designerUrl = "admin/schema-object-designer";

    async save() {
        let constructor = (this as any).prototype.constructor;
        if (!constructor.className) {
            let msg = "!constructor.className";
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.props.className = constructor.className;
        return saveSchemaObjectApiRequest({object: this.props})
    }

    // async load(id: string) {
    //     this.props.id = id;
    //     // if (!this.props || !this.props.id)
    //     //     throw   "SchemaObject.load(): не заполнен props.id";
    //     this.props = (await loadSchemaObjectApiRequest({id: id})).object as any;
    // }

}


