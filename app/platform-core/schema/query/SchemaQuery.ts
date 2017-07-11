import {SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> {
    static className="platform-core:SchemaQuery";
    static designerUrl="admin/schema-query-designer";

}