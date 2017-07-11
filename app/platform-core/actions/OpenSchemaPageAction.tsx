import * as React from "react";
import {IActionProps} from "./IActionProps";
import {Action, IActionClassInfo} from "./Action";
import {IOpenSchemaPageAction} from "./IOpenSchemaPageAction";
import {SchemaPage} from "../schema/SchemaPage";
import {SchemaHelper} from "../schema/SchemaHelper";

export class OpenSchemaPageAction extends Action<IOpenSchemaPageAction> {

    // static actionId: string = "platform-core/actions/OpenSchemaPageAction";
    // static actionName: string = "action: открыть страницу";

    static classInfo: IActionClassInfo = {
        className: "platform-core:OpenSchemaPageAction",
        constructor: OpenSchemaPageAction,
        actionName: "открыть страницу"
    };

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена открыть страницу</div>
    }

    async doAction(){
        console.log("doAction9-open:"+this.props.pageId);
        let page=await SchemaHelper.createSchemaObject<SchemaPage>(this.props.pageId);
        window.location.href = page.props.url;
        //page.show();
    }

}