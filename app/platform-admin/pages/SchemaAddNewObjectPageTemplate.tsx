import * as React from "react";
import {
    message,
    Alert,
    Modal,
    Table,
    Tabs,
    Icon,
    Input,
    Button,
    Form,
    Row,
    Col,
    LocaleProvider,
    DatePicker
} from 'antd';
import {IPageTemplateClassInfo, PageTemplate} from "../../platform-core/components/PageTemplate";
import {AdminMainPageTemplate} from "./AdminMainPageTemplate";
import {getParamFromUrl} from "../../platform-core/utils/getQueryParamFromUrl";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";
import {SchemaObject} from "../../platform-core/schema/SchemaObject";
import {SchemaHelper} from "../../platform-core/schema/SchemaHelper";
import {QueryGrid} from "../../platform-core/components/QueryGrid";
import {AdminConst} from "../AdminConst";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";

export interface ISchemaAddNewObjectPageTemplateProps {

}

export class SchemaAddNewObjectPageTemplate extends AdminMainPageTemplate {


    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:SchemaAddNewObjectPageTemplate",
        constructor: SchemaAddNewObjectPageTemplate,
        pageTemplateName: "шаблон страницы добавления нового объекта конфигурации"

    };


    renderTop(): JSX.Element {
        return (
            <div>
                {super.renderTop()}
                <h2>Создание нового объекта конфигурации</h2>
            </div>
        );
        // return (
        //     <div>
        //         {super.renderTop()}
        //         <QueryGrid queryId={"schema-query:org9834rt35788AF517DDE"}/>
        //     </div>
        // );
    }


}