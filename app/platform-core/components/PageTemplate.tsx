import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaPage} from "../schema/SchemaPage";


export interface IPageTemplateProps {
    schemaPageId: string;
}

export class PageTemplate extends React.Component<IPageTemplateProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        console.log("PageTemplate:::" + PageTemplate.pageTemplateId);
    }

    static pageTemplateId: string = "platform-core/components/PageTemplate";
    static pageTemplateName: string = "базовый шаблон страницы";

    schemaPage: SchemaPage;
    loadDataError: string;

    async loadData() {
        if (!this.schemaPage) {
            this.schemaPage = new SchemaPage();
            await this.schemaPage.load(this.props.schemaPageId);
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

    handleClick = () => {
        pingApiRequest({login: "111"}).then((eee: any) => {
            console.log(eee);
        });
        superPingApiRequest({super_login: "222"}).then((eee: any) => {
            console.log(eee);
        });
        console.log("click1");
    };

    renderPage(): JSX.Element {
        return <div>page {this.props.schemaPageId}</div>
    }

    render() {
        if (this.loadDataError)
            return <div style={{color: "red"}}>ОШИБКА: {this.loadDataError}</div>;
        else if (this.schemaPage)
            return this.renderPage();
        else
            return <div>загрузка...</div>;
    }

}