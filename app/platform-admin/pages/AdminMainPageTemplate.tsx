import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {IPageTemplateProps, PageTemplate} from "../../platform-core/components/PageTemplate";
import {PropTypes} from "react";
import {appState} from "../../platform-core/AppState";
import isDivisibleBy = require("validator/lib/isDivisibleBy");

export interface IAdminMainPageTemplateProps extends IPageTemplateProps {

}

export class AdminMainPageTemplate extends PageTemplate {

    static pageTemplateId: string = "platform-admin/pages/AdminMainPageTemplate";
    static pageTemplateName: string = "шаблон главной страницы админки";

    static contextTypes = {
        color: PropTypes.any
    };

    shouldComponentUpdate(): boolean {
        return true;
    }

    // renderChildren(): JSX.Element {
    //     return (
    //         <div style={{background: this.context.color}}>
    //             {super.renderChildren()}
    //         </div>
    //
    //     )
    // }

    renderTop(): JSX.Element {
        return (
            <div>админка НАЧАЛО главная страница: {this.schemaPage.props.title}</div>
        );
    }

    renderBottom(): JSX.Element {
        return (
            <div>админка КОНЕЦ главная страница: {this.schemaPage.props.title}</div>
        );
    }


}