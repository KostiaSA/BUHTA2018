import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaQueryProps} from "./ISchemaQueryProps";
import {executeSchemaQueryApiRequest} from "../api/executeSchemaQueryApiRequest";


export interface ISchemaQueryClassInfo extends ISchemaObjectClassInfo<typeof SchemaQuery> {

}

export class SchemaQuery extends SchemaObject<ISchemaQueryProps> {

    static classInfo: ISchemaQueryClassInfo = {
        className: "platform-core:SchemaQuery",
        constructor: SchemaQuery,
        designerUrl: "admin/schema-query-designer"
    };

    async loadData():Promise<any[]>{
        return (await executeSchemaQueryApiRequest({queryId:this.props.id})).rows;
    }
}