
import {appState} from "../../AppState";
import {IClassInfo} from "../../IClassInfo";
import {ISchemaTableRowProps} from "./ISchemaTableRowProps";

export interface ISchemaTableRow{
    openChangeRecordPage(recordId: string):Promise<void>;

}

export interface ISchemaTableRowClassInfo extends IClassInfo<typeof SchemaTableRow> {

}

export class SchemaTableRow<T extends ISchemaTableRowProps> implements ISchemaTableRow{

    props:T;

    static classInfo: ISchemaTableRowClassInfo = {
        className: "platform-core:SchemaTableRow",
        constructor: SchemaTableRow,
    };

    async openChangeRecordPage(recordId: string):Promise<void> {

          let msg="abstract error";
          console.error(msg);
          throw msg+", "+__filename;

    }


}