import {_SchemaObject} from "../_SchemaObject";
import {ISchemaPageProps} from "../../../schema/ISchemaPage";
import {SchemaPage} from "../../../schema/SchemaPage";

export class _SchemaPage extends _SchemaObject<ISchemaPageProps> {
    static classInfo  = { ...SchemaPage.classInfo, constructor:_SchemaPage };

}