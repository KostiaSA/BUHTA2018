import {ISchemaObjectProps} from "../ISchemaObject";
import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";


export interface ISchemaTableClassInfo extends ISchemaObjectClassInfo<typeof SchemaTable> {

}

export class SchemaTable extends SchemaObject<ISchemaTableProps> {
    //static className="platform-core:SchemaTable";
    //static designerUrl="admin/schema-table-designer";

    static classInfo: ISchemaTableClassInfo = {
        className: "platform-core:SchemaTable",
        constructor: SchemaTable,
        designerUrl: "admin/schema-table-designer",
        recordIdPrefix:"schema-table"
    };

    async handleChangeRecordClick(recordId: string) {

        let editOptions={...this.props.editOptions, };
        console.log("---this.props.editOptions---", this.props.editOptions);

    }


}