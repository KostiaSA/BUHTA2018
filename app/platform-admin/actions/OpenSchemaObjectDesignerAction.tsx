import * as React from "react";
import {IActionProps} from "../../platform-core/actions/IActionProps";
import {Action, IActionClassInfo} from "../../platform-core/actions/Action";
import {appState} from "../../platform-core/AppState";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";
import {SchemaHelper} from "../../platform-core/schema/SchemaHelper";
import {SchemaObjectDesignerPageTemplate} from "../pages/SchemaObjectDesignerPageTemplate";
import {ISchemaPageClassInfo} from "../../platform-core/schema/SchemaPage";

export interface IOpenSchemaObjectDesignerActionProps extends IActionProps {
    objectId: string;
}


export class OpenSchemaObjectDesignerAction extends Action<IOpenSchemaObjectDesignerActionProps> {

    // static actionId: string = "platform-admin/actions/OpenSchemaObjectDesignerAction";
    // static actionName: string = "action: открыть объект схемы в дизайнере";

    static classInfo: IActionClassInfo = {
        className: "platform-core:OpenSchemaObjectDesignerAction",
        constructor: OpenSchemaObjectDesignerAction,
        actionName: "открыть объект схемы в дизайнере"
    };

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена открыть страницу</div>
    }

    async doAction() {
        console.log("do Action OpenSchemaObjectDesignerAction:" + this.props.objectId);
        let editedObject = await SchemaHelper.createSchemaObject(this.props.objectId);
        let editedObjectClass = appState.getRegisteredClassInfo<ISchemaPageClassInfo>(editedObject.props.className);
        let designerUrl = editedObjectClass.designerUrl;
        window.location.href = editedObjectClass.designerUrl + "?objectid=" + this.props.objectId;
        //page.show();
    }

}