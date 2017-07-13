
import {appState} from "../../AppState";
import {IClassInfo} from "../../IClassInfo";
import {ISchemaTableRowProps} from "./ISchemaTableRowProps";



export interface ISchemaTableRowClassInfo extends IClassInfo<typeof SchemaTableRow> {

}

export class SchemaTableRow<T extends ISchemaTableRowProps> {

    props:T;

    static classInfo: ISchemaTableRowClassInfo = {
        className: "platform-core:SchemaTableRow",
        constructor: SchemaTableRow,
    };

    async handleChangeRecordClick() {

        if (this.props.__recordId__) {
            let classInfo = appState.getRegisteredClassInfoByPrefix(this.props.__recordId__);
            if (classInfo) {
                // let obj = new classInfo.constructor();
                // obj.handleChangeRecordClick(recordId);
            }
            // let editOptions = {...this.props.editOptions,};
            // console.log("---this.props.editOptions---", recordId, classInfo);
        }
    }


}