import {ISchemaObjectProps} from "../../schema/ISchemaObject";
import {ISchemaObjectClassInfo} from "../../schema/SchemaObject";

export class _SchemaObject<T extends ISchemaObjectProps> {
    constructor(props?: T) {
        let objClassName = (this.constructor as any).classInfo.className;
        if (props) {
            if (props.className !== objClassName) {
                let msg = "несоответствие классов: '" + props.className + "'<>'" + objClassName + "'";
                console.error(msg);
                throw msg + ", " + __filename;
            }
            this.props = props;
        }
        else {
            this.props = {} as any;
            this.props.className = objClassName;
        }
    }

    props: T;

    async save() {

        let classInfo = (this.constructor as any).classInfo as ISchemaObjectClassInfo<any>;
        if (!classInfo) {
            let msg = "!constructor.classInfo";
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.props.className = classInfo.className;

        const _saveSchemaObjectApiResponse = require("../../schema/api/_saveSchemaObjectApiResponse");
        let result = await _saveSchemaObjectApiResponse({object: this.props});
        if (result.error) {
            let msg = result.error;
            console.error(msg);
            throw msg + ", " + __filename;
        }
        //return _saveSchemaObjectApiRequest({object: this.props})
    }

}


