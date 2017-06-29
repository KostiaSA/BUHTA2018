import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";


export interface IPageTemplateProps {

}

export class PageTemplate extends React.Component<IPageTemplateProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        console.log("PageTemplate:::"+PageTemplate.templateId);
    }

    static templateId:string="platform-core/components/PageTemplate";
    static templateName:string="базовый шаблон страницы";

    componentDidMount() {
    };

    handleClick = () => {
        pingApiRequest({login: "111"}).then((eee: any) => {
            console.log(eee);
        });
        superPingApiRequest({super_login: "222"}).then((eee: any) => {
            console.log(eee);
        });
        console.log("click1");
    };

    render() {

        return (
            <div>это page template<br/>{this.props.children}</div>
        );
    }

}