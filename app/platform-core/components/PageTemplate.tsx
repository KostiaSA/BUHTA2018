import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaPage} from "../schema/SchemaPage";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {createSchemaObject} from "../schema/SchemaObject";
import {WrappedFormUtils} from "antd/es/form/Form";

export interface IPageTemplateProps {
    //schemaPageId: string;
    form:WrappedFormUtils;
}

//export class PageTemplate<P extends IPageTemplateProps> extends React.Component<P , any> {
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
            this.schemaPage = await createSchemaObject<SchemaPage>((document as any).schemaPageId);
            //await this.schemaPage.load((document as any).schemaPageId);
        }
    }

    // getChildContext() {
    //     return {color: "purple"};
    // }
    //
    // static childContextTypes = {
    //     color: PropTypes.any
    // };

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

    renderTop(): JSX.Element {
        return (
            <div>
                TOP
            </div>
        );
    }

    renderBottom(): JSX.Element {
        return (
            <div>
                BOTTOM
            </div>
        );
    }

    renderChildren(): JSX.Element {
        return this.props.children as any;
    }

    render() {
        //console.log("render page template",this.schemaPage);
        if (this.loadDataError)
            return <div style={{color: "red"}}>ОШИБКА: {this.loadDataError}</div>;
        else if (this.schemaPage) {
            // appState.globals.XXX = this.schemaPage;
            // console.log("appState.globals.XXX = this.schemaPage;");
            return (
                <LocaleProvider locale={(window as any).antd.locales.ru_RU}>
                    <div>
                        <div>page template НАЧАЛО: {this.schemaPage.props.title}</div>
                        {this.renderTop()}
                        {this.renderChildren()}
                        {this.renderBottom()}
                        <div>page template КОНЕЦ: {this.schemaPage.props.title}</div>
                    </div>
                </LocaleProvider>

            );
        }
        else
            return <div>загрузка...</div>;
    }

}

