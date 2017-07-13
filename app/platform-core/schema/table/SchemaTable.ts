import {ISchemaObjectProps} from "../ISchemaObject";
import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaTableProps} from "./ISchemaTableProps";
import {appState} from "../../AppState";


export interface ISchemaTableClassInfo extends ISchemaObjectClassInfo<typeof SchemaTable> {

}

export class SchemaTable extends SchemaObject<ISchemaTableProps> {
    //static className="platform-core:SchemaTable";
    //static designerUrl="admin/schema-table-designer";

    static classInfo: ISchemaTableClassInfo = {
        className: "platform-core:SchemaTable",
        constructor: SchemaTable,
        designerUrl: "admin/schema-table-designer",
        recordIdPrefix: "schema-table"
    };

    async handleChangeRecordClick(recordId: string) {

        let classInfo = appState.getRegisteredClassInfoByPrefix(recordId);
        if (classInfo){
            let obj=new classInfo.constructor();
            obj.handleChangeRecordClick(recordId);
        }
        let editOptions = {...this.props.editOptions,};
        console.log("---this.props.editOptions---", recordId, classInfo);

    }


}