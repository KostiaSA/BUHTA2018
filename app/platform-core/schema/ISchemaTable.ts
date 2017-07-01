import {ISchemaObjectProps} from "./ISchemaObject";
import {SchemaObject} from "./SchemaObject";

export interface ISchemaTableProps extends ISchemaObjectProps {
    sqlName?: string;
}

export class SchemaTable extends SchemaObject<ISchemaTableProps> {
    static className="platform-core/schema/SchemaTable";
}