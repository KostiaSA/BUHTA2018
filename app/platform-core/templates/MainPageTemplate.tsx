import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";


export interface IPageTemplateProps {

}

export class MainPageTemplate extends React.Component<IPageTemplateProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    static templateId:string="platform-core/templates/MainPageTemplate";
    static templateName:string="шаблон главной страницы";

    componentDidMount() {
    };

    render() {

        return (
            <div>это главная страница<br/>{this.props.children}</div>
        );
    }

}