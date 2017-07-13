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

export interface ISchemaObjectListPageTemplateProps {

}

export class SchemaObjectListPageTemplate extends AdminMainPageTemplate {


    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:SchemaObjectListPageTemplate",
        constructor: SchemaObjectListPageTemplate,
        pageTemplateName: "шаблон страницы просмотра объектов конфигурации"

    };


    renderTop(): JSX.Element {
        return (
            <div>
                {super.renderTop()}
                <QueryGrid queryId={AdminConst.SchemaTableQueryObjectId}/>
            </div>
        );
        // return (
        //     <div>
        //         {super.renderTop()}
        //         <QueryGrid queryId={"schema-query:org9834rt35788AF517DDE"}/>
        //     </div>
        // );
    }


    // async loadData() {
    //
    //     await super.loadData();
    //     console.log("load schema object");
    //     if (!this.designedObject) {
    //         let designedObjectId = getParamFromUrl("objectid");
    //         if (designedObjectId) {
    //             this.designedObject = await SchemaHelper.createSchemaObject(designedObjectId);
    //             //setInterval(this.trackChanges, 100);
    //             //this.orginalObjectPropsJson = JSON.stringify(this.designedObject.props);
    //         }
    //     }
    // }
    //

}