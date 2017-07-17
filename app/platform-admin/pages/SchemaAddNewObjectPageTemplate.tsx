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
const {Column, ColumnGroup} = Table;

import {IPageTemplateClassInfo, PageTemplate} from "../../platform-core/components/PageTemplate";
import {AdminMainPageTemplate} from "./AdminMainPageTemplate";
import {getParamFromUrl} from "../../platform-core/utils/getQueryParamFromUrl";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";
import {ISchemaObjectClassInfo, SchemaObject} from "../../platform-core/schema/SchemaObject";
import {SchemaHelper} from "../../platform-core/schema/SchemaHelper";
import {QueryGrid} from "../../platform-core/components/QueryGrid";
import {AdminConst} from "../AdminConst";
import {SchemaQuery} from "../../platform-core/schema/query/SchemaQuery";
import {ISchemaTableColumnProps} from "../../platform-core/schema/table/ISchemaTableColumnProps";
import {appState} from "../../platform-core/AppState";
import {SchemaPage} from "../../platform-core/schema/SchemaPage";
let Highlighter = require("react-highlight-words");

export interface ISchemaAddNewObjectPageTemplateProps {

}

export class SchemaAddNewObjectPageTemplate extends AdminMainPageTemplate {


    static classInfo: IPageTemplateClassInfo = {
        className: "platform-admin:SchemaAddNewObjectPageTemplate",
        constructor: SchemaAddNewObjectPageTemplate,
        pageTemplateName: "шаблон страницы добавления нового объекта конфигурации"

    };

    async createClickHandler(record: ISchemaObjectClassInfo<any>): Promise<any> {
        if (record.editOptions && (record.editOptions.addPageId || record.editOptions.editPageId)) {
            let page = await SchemaHelper.createSchemaObject<SchemaPage>(record.editOptions.addPageId! || record.editOptions.editPageId!);
            page.openInCurrentTab();
        }
    };

    searchValue: string;

    getFilteredColumnList(): ISchemaObjectClassInfo<any>[] {

        if (!this.searchValue || this.searchValue === "")
            return appState.getRegisteredSchemaObjectTypes();
        else {
            let value = this.searchValue.toLocaleLowerCase();
            return appState.getRegisteredSchemaObjectTypes().filter((col: ISchemaObjectClassInfo<any>) => {
                return col.title.toLocaleLowerCase().indexOf(value) >= 0;
            });
        }
    }

    renderTop(): JSX.Element {
        return (
            <div>
                {super.renderTop()}
                <Row>
                    <Col span={18} style={{marginBottom: 12}}>
                        <h2>Создание нового объекта конфигурации</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} style={{marginBottom: 12}}>
                        <Input.Search
                            placeholder="поиск по имени колонки"
                            style={{width: 300}}
                            value={this.searchValue}
                            onChange={(event: any) => {
                                this.searchValue = event.target.value;
                                this.forceUpdate();
                            }}
                            addonAfter={(
                                <span style={{cursor: "default"}} onClick={() => {
                                    this.searchValue = "";
                                    this.forceUpdate()
                                }}
                                >
                          очистить
                        </span>)
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={18} style={{marginBottom: 12}}>
                        <Table size="middle"
                               bordered rowKey="name"
                               dataSource={this.getFilteredColumnList()}
                               pagination={{pageSize: 100} as any}>
                            <Column
                                title="Имя объекта"
                                dataIndex="name"
                                render={ (text: any, record: ISchemaObjectClassInfo<any>) => {

                                    return (
                                        <a href="#" onClick={() => this.createClickHandler(record)}>
                                            <Highlighter
                                                searchWords={[this.searchValue]}
                                                textToHighlight={record.title}
                                            >
                                                {record.title}
                                            </Highlighter>
                                        </a>
                                    )
                                }}
                            />
                            <Column
                                title="Описание"
                                dataIndex="description"
                            />
                            <Column
                                title="Действие"
                                key="action"
                                render={ (text: any, record: ISchemaObjectClassInfo<any>) => (
                                    <span>
                                 <a href="#" onClick={() => this.createClickHandler(record)}>создать</a>
                            </span>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
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