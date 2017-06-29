import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaPage} from "../schema/SchemaPage";
import {isUndefined} from "util";


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

    async loadData(){
        if (!this.schemaPage) {
            this.schemaPage = new SchemaPage();
            await this.schemaPage.load(this.props.schemaPageId);
        }
    }

    // async loadData(): Promise<boolean> {
    //     console.log("page T load data");
    //     if (!this.schemaPage) {
    //         this.schemaPage = new SchemaPage();
    //         await this.schemaPage.load(this.props.schemaPageId);
    //         return true;
    //     }
    //     return false;
    // }


    // componentWillReceiveProps(nextProps: IPageTemplateProps) {
    //     console.log("page T componentWillReceiveProps",this.props.schemaPageId);
    //     if (nextProps.schemaPageId !== this.props.schemaPageId) {
    //         this.schemaPage = undefined as any;
    //     }
    // }
    //
    // componentWillUpdate() {
    //     console.log("page T componentWillReceiveProps");
    //     this.loadData()
    //         .then((needForceUpdate) => {
    //             if (needForceUpdate)
    //                 this.forceUpdate();
    //         })
    //         .catch((err: any) => {
    //             this.loadDataError = err.toString();
    //             this.forceUpdate();
    //         });
    // }
    //

    componentDidMount() {
        //console.log("page T didMount");
        this.loadData()
            .then(() => {
                this.forceUpdate();
            })
            .catch((err: any) => {
                this.loadDataError = err.toString();
                this.forceUpdate();
            });

    }
    ;

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