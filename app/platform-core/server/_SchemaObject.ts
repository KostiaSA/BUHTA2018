
import {ISchemaObjectProps} from "../schema/ISchemaObject";

export class _SchemaObject<T extends ISchemaObjectProps> {
    props: T = {} as any;
}


