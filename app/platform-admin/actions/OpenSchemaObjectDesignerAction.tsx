import * as React from "react";
import {IAction} from "../../platform-core/actions/IAction";
import {Action} from "../../platform-core/actions/Action";
import {createSchemaObject, SchemaObject} from "../../platform-core/schema/SchemaObject";
import {appState} from "../../platform-core/AppState";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";

export interface IOpenSchemaObjectDesignerActionProps extends IAction {
    objectId: string;
}


export class OpenSchemaObjectDesignerAction extends Action<IOpenSchemaObjectDesignerActionProps> {

    static actionId: string = "platform-admin/actions/OpenSchemaObjectDesignerAction";
    static actionName: string = "action: открыть объект схемы в дизайнере";

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена открыть страницу</div>
    }

    async doAction() {
        console.log("do Action OpenSchemaObjectDesignerAction:" + this.props.objectId);
        let editedObject = await createSchemaObject(this.props.objectId);
        let editedObjectClass = appState.getRegisteredSchemaObject(editedObject.props.className);
        let designerUrl = editedObjectClass.designerUrl;
        window.location.href = editedObjectClass.designerUrl + "?objectid=" + this.props.objectId;
        //page.show();
    }

}