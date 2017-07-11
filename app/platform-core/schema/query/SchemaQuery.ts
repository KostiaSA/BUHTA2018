import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";


export interface ISchemaQueryClassInfo extends ISchemaObjectClassInfo<typeof SchemaQuery> {

}

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> {
    //static className="platform-core:SchemaQuery";
    //static designerUrl="admin/schema-query-designer";

    static classInfo: ISchemaQueryClassInfo = {
        className: "platform-core:SchemaQuery",
        constructor: SchemaQuery,
        designerUrl: "admin/schema-query-designer"
    }
}