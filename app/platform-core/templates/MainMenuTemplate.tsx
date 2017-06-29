import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {MenuTemplate} from "../components/MenuTemplate";
import {ISchemaMenuItem} from "../schema/ISchemaMenu";
import {Action, createAction} from "../actions/Action";

export class MainMenuTemplate extends MenuTemplate {
    // constructor(props: any, context: any) {
    //     super(props, context);
    // }

    static menuTemplateId: string = "platform-core/templates/MainMenuTemplate";
    static menuTemplateName: string = "шаблон главного меню";

    componentDidMount() {
    };


    handleClick(item: ISchemaMenuItem) {
        createAction(item.action).doAction();
        console.log("click")
    };

    render() {

        return (
            <div>
                это главное меню {this.props.schemaMenu.props.items.length}
                {this.props.schemaMenu.props.items.map((item: ISchemaMenuItem) => {
                    return <button onClick={() => {
                        this.handleClick(item)
                    }}> {item.label}</button>
                })}
            </div>
        );
    }

}