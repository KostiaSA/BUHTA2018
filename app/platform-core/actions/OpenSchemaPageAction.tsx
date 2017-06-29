import * as React from "react";
import {IAction} from "./IAction";
import {Action} from "./Action";
import {IOpenSchemaPageAction} from "./IOpenSchemaPageAction";

export class OpenSchemaPageAction extends Action<IOpenSchemaPageAction> {

    static actionId: string = "platform-core/action/OpenSchemaPageAction";
    static actionName: string = "action: открыть страницу";

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена открыть страницу</div>
    }
}