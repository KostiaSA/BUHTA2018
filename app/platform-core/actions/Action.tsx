import * as React from "react";
import {IActionProps} from "./IActionProps";
import {appState} from "../AppState";
import {IClassInfo} from "../IClassInfo";
import {IMenuTemplateClassInfo} from "../components/MenuTemplate";

export interface IActionClassInfo extends IClassInfo<typeof Action> {
    actionName:string;
}


export class Action<T extends IActionProps> {
    props: T = {} as any;
    // static actionId: string = "platform-core:Action";
    // static actionName: string = "базовый action";

    static classInfo: IActionClassInfo = {
        className: "platform-core:Action",
        constructor: Action,
        actionName: "базовый шаблон меню"
    };

    async doAction() {

    }

    renderDesigner(): JSX.Element {
        return <div>это дизайнер экшена</div>
    }
}

export function createAction(action: IActionProps): Action<any> {
    let actClass = appState.getRegisteredClassInfo(action.actionClassName).constructor;
    let act = new actClass();
    act.props = action;
    return act as any;
}