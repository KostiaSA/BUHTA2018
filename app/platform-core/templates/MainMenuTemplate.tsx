import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {MenuTemplate} from "../components/MenuTemplate";


export interface IMenuTemplateProps {

}

export class MainMenuTemplate extends MenuTemplate {
    // constructor(props: any, context: any) {
    //     super(props, context);
    // }

    static menuTemplateId:string="platform-core/templates/MainMenuTemplate";
    static menuTemplateName:string="шаблон главного меню";

    componentDidMount() {
    };

    render() {

        return (
            <div>это главное меню<br/>{this.props.children}</div>
        );
    }

}