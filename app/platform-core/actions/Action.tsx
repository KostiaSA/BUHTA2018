import * as React from "react";
import {IAction} from "./IAction";

export class Action<T extends IAction> {
    props: T = {} as any;
    static actionId:string="platform-core/action/Action";
    static actionName:string="базовый action";

    renderDesigner():JSX.Element{
        return <div>это дизайнер экшена</div>
    }
}