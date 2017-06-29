import * as React from "react";
import {IAction} from "./IAction";
import {Action} from "./Action";
import {IOpenSchemaPageAction} from "./IOpenSchemaPageAction";
import {createSchemaPage} from "../schema/SchemaPage";

export class OpenSchemaPageAction extends Action<IOpenSchemaPageAction> {

    static actionId: string = "platform-core/actions/OpenSchemaPageAction";
    static actionName: string = "action: открыть страницу";

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена открыть страницу</div>
    }

    async doAction(){
        console.log("doAction9-open:"+this.props.pageId);
        let page=await createSchemaPage(this.props.pageId);
        page.show();
    }

}