import {appState} from "../../AppState";
import {IClassInfo} from "../../IClassInfo";
import {ISchemaTableRowProps} from "./ISchemaTableRowProps";
import {SchemaTable} from "./SchemaTable";
import {saveTableRowApiRequest} from "./api/saveTableRowApiRequest";

export interface ISchemaTableRow {
    openChangeRecordPage(recordId: string): Promise<void>;

}

export interface ISchemaTableRowClassInfo extends IClassInfo<typeof SchemaTableRow> {

}

export class SchemaTableRow<T extends ISchemaTableRowProps> implements ISchemaTableRow {

    constructor(public table: SchemaTable, public props: T) {

    }

    static classInfo: ISchemaTableRowClassInfo = {
        className: "platform-core:SchemaTableRow",
        constructor: SchemaTableRow,
    };

    async openChangeRecordPage(recordId: string): Promise<void> {

        let msg = "abstract error";
        console.error(msg);
        throw msg + ", " + __filename;

    }

    async save(initialProps: T) {

        let propsToSave: any = {};

        // если есть состояние объекта до редактирования, до создаем объект с только полями, которые менялись
        for (let field of this.table.props.columns) {
            if (field.primaryKey || !initialProps || initialProps[field.name] !== this.props[field.name]) {
                propsToSave[field.name] = this.props[field.name];

            }
        }

        ! ошибка сохранение не показывается !

        return saveTableRowApiRequest({tableId: this.table.props.id, row: propsToSave})

        // let msg = "save not yet implemented";
        // console.error(msg, propsToSave);
        // throw msg + ", " + __filename;

    }


}