import * as React from "react";
import {IAction} from "./IAction";
import {appState} from "../AppState";

export class Action<T extends IAction> {
    props: T = {} as any;
    static actionId: string = "platform-core/action/Action";
    static actionName: string = "базовый action";

    async doAction() {

    }

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена</div>
    }
}

export function createAction(action: IAction): Action<any> {
    let actClass = appState.getRegisteredAction(action.actionId) as Function;
    let act = new (actClass as any)();
    act.props = action;
    return act as any;
}