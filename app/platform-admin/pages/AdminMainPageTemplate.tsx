import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {IPageTemplateClassInfo, IPageTemplateProps, PageTemplate} from "../../platform-core/components/PageTemplate";

export interface IAdminMainPageTemplateProps extends IPageTemplateProps {

}


export class AdminMainPageTemplate extends PageTemplate {

    //static className: string = "platform-admin:AdminMainPageTemplate";
    //static pageTemplateName: string = "шаблон главной страницы админки";

    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:AdminMainPageTemplate",
        constructor: AdminMainPageTemplate,
        pageTemplateName: "шаблон главной страницы админки"

    }

    renderTop(): JSX.Element {
        if (this.schemaPage)
            return (
                <div>админка НАЧАЛО главная страница: {this.schemaPage.props.title}</div>
            );
        else
            return null as any;
    }

    renderBottom(): JSX.Element {
        if (this.schemaPage)
            return (
                <div>админка КОНЕЦ главная страница: {this.schemaPage.props.title}</div>
            );
        else
            return null as any;
    }


}