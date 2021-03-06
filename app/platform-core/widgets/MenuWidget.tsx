import * as React from "react";
import {appState} from "../AppState";
import {IMenuTemplateProps} from "../components/MenuTemplate";
import {SchemaHelper} from "../schema/SchemaHelper";
import {SchemaMenu} from "../schema/menu/SchemaMenu";


export interface IMenuWidgetProps {
    menuId: string;
}

export class MenuWidget extends React.Component<IMenuWidgetProps, any> {

    schemaMenu: SchemaMenu;
    loadDataError: string;

    async loadData() {
        if (!this.schemaMenu) {
            this.schemaMenu = await SchemaHelper.createSchemaObject<SchemaMenu>(this.props.menuId);
            //await this.schemaMenu.load(this.props.menuId);
        }
    }

    componentDidMount() {
        this.loadData()
            .then(() => {
                this.forceUpdate();
            })
            .catch((err: any) => {
                this.loadDataError = err.toString();
                this.forceUpdate();
            });

    };

    render() {
        if (!this.props.menuId) {
            return null;
        }
        else if (this.loadDataError) {
            return <div style={{color: "red"}}>ОШИБКА MenuWidget: {this.loadDataError}</div>;
        }
        else if (this.schemaMenu) {
            //let menuTemplate = appState.getRegisteredClassInfo(this.schemaMenu.props.template).constructor;
            //return React.createElement(menuTemplate, {schemaMenu:this.schemaMenu} as IMenuTemplateProps);
            return <div>menu widget...</div>;
        }
        else {
            return <div>загрузка...</div>;
        }
    }

}