import * as React from "react";
import * as ReactDOM from "react-dom";
import {IClassInfo} from "../IClassInfo";
import {ISchemaMenuProps} from "../schema/menu/ISchemaMenuProps";


export interface IMenuTemplateProps {
    schemaMenu: ISchemaMenuProps[];
}

export interface IMenuTemplateClassInfo extends IClassInfo<typeof MenuTemplate> {
    menuTemplateName:string;
}

export class MenuTemplate extends React.Component<IMenuTemplateProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        //console.log("MenuTemplate:::" + MenuTemplate.menuTemplateId);
    }

    //static menuTemplateId: string = "platform-core/components/MenuTemplate";
    //static menuTemplateName: string = "базовый шаблон меню";

    static classInfo: IMenuTemplateClassInfo = {
        className: "platform-core:MenuTemplate",
        constructor: MenuTemplate,
        menuTemplateName: "базовый шаблон меню"
    };

    componentDidMount() {
    };

    render() {

        return (
            <div>это menu template<br/>{this.props.children}</div>
        );
    }

}