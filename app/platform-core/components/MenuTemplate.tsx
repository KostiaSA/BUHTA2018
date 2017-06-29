import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {ISchemaMenu, SchemaMenu} from "../schema/ISchemaMenu";


export interface IMenuTemplateProps {
    schemaMenu: SchemaMenu;
}

export class MenuTemplate extends React.Component<IMenuTemplateProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        console.log("MenuTemplate:::" + MenuTemplate.menuTemplateId);
    }

    static menuTemplateId: string = "platform-core/components/MenuTemplate";
    static menuTemplateName: string = "базовый шаблон страницы";

    componentDidMount() {
    };

    render() {

        return (
            <div>это menu template<br/>{this.props.children}</div>
        );
    }

}