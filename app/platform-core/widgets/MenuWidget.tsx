import * as React from "react";
import {appState} from "../AppState";
import {SchemaMenu} from "../schema/ISchemaMenu";
import {IMenuTemplateProps} from "../components/MenuTemplate";


export interface IMenuWidgetProps {
    menuId: string;
}

export class MenuWidget extends React.Component<IMenuWidgetProps, any> {

    schemaMenu: SchemaMenu;
    loadDataError: string;

    async loadData() {
        if (!this.schemaMenu) {
            this.schemaMenu = new SchemaMenu();
            await this.schemaMenu.load(this.props.menuId);
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
            let menuTemplate = appState.getRegisteredMenuTemplate(this.schemaMenu.props.template);
            return React.createElement(menuTemplate as any, {schemaMenu:this.schemaMenu} as IMenuTemplateProps);
        }
        else {
            return <div>загрузка...</div>;
        }
    }

}