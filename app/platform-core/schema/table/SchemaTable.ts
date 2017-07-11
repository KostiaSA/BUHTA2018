import {ISchemaObjectProps} from "../ISchemaObject";
import {SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";

export class SchemaTable extends SchemaObject<ISchemaTableProps> {
    static className="platform-core:SchemaTable";
    static designerUrl="admin/schema-table-designer";

}