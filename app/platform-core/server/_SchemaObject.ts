import {ISchemaObjectProps} from "../schema/ISchemaObject";
import {schemaObjectModel} from "../schema/_schemaObjectModel";
import {parse} from "ejson";
import {serverState} from "./ServerState";
import {_saveSchemaObjectApiResponse} from "../schema/api/_saveSchemaObjectApiResponse";

export class _SchemaObject<T extends ISchemaObjectProps> {
    constructor(props?: T) {
        if (props) {
            if (props.className !== (this.constructor as any).className) {
                let msg = "несоответствие классов: '" + props.className + "'<>'" + (this.constructor as any).className + "'";
                console.error(msg);
                throw msg + ", " + __filename;
            }
            this.props = props;
        }
        else {
            this.props = {} as any;
            this.props.className=(this.constructor as any).className;
        }
    }

    static className = "platform-core:?";
    props: T;

    async save() {
        let constructor = this.constructor as any;
        if (!constructor.className) {
            let msg = "!constructor.className";
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.props.className = constructor.className;
        await _saveSchemaObjectApiResponse({object: this.props});

        //return _saveSchemaObjectApiRequest({object: this.props})
    }

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

