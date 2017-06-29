import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {MenuTemplate} from "../components/MenuTemplate";
import {ISchemaMenuItem} from "../schema/ISchemaMenu";

export class MainMenuTemplate extends MenuTemplate {
    // constructor(props: any, context: any) {
    //     super(props, context);
    // }

    static menuTemplateId: string = "platform-core/templates/MainMenuTemplate";
    static menuTemplateName: string = "шаблон главного меню";

    componentDidMount() {
    };

    render() {

        return (
            <div>
                это главное меню {this.props.schemaMenu.props.items.length}
                {this.props.schemaMenu.props.items.map((item: ISchemaMenuItem) => {
                    return <button>{item.label}</button>
                })}
            </div>
        );
    }

}