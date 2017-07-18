import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaPage} from "../schema/SchemaPage";
import {Table, Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {WrappedFormUtils} from "antd/es/form/Form";
import {SchemaHelper} from "../schema/SchemaHelper";
import {IClassInfo} from "../IClassInfo";
import {SchemaQuery} from "../schema/query/SchemaQuery";
import {ColumnProps} from "antd/es/table/Column";
import {SchemaQueryHelper} from "../schema/query/SchemaQueryHelper";
import {CSSProperties} from "react";

export interface IQueryGridProps {
    queryId: string;
    random?: string;
    showRefreshButton?: boolean;
    showAddButton?: boolean;
    addButtonText?: string | JSX.Element;
    refreshButtonText?: string | JSX.Element;
}


export class QueryGrid extends React.Component<IQueryGridProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    query: SchemaQuery;
    loadDataError: string;
    dataSource: any[];
    columns: ColumnProps<any>[];
    random?: string;
    loading: boolean = false;

    async loadData() {
        if (!this.query || this.props.random !== this.random) {
            console.log("load data");
            try {
                this.loading=true;
                this.random = this.props.random;
                this.query = await SchemaHelper.createSchemaObject<SchemaQuery>(this.props.queryId);
                await this.createColumns();
                this.dataSource = await this.query.loadData();
                delete this.loadDataError;
                this.loading=false;
            }
            catch (error) {
                this.loading=false;
                this.loadDataError = error.toString();
                this.random = this.props.random;
                console.error(error);
            }
        }
    }

    async handleChangeRecordClick(record: any) {
        this.query.handleChangeRecordClick(record.__recordId__);
    };

    async createColumns() {
        let helper = new SchemaQueryHelper(this.query.props);
        await  helper.createTree();
        this.columns = [];

        for (let col of helper.columns) {
            if (!col.props.tableId && !col.props.isHidden && !col.props.isDisabled) {
                let colProps: ColumnProps<any> = {
                    title: col.props.fieldCaption,
                    dataIndex: col.props.fieldCaption,
                };
                this.columns.push(colProps);
            }
        }

        // колонка редактирования
        let colProps: ColumnProps<any> = {
            title: "действия",
            key: "action",
            render: (text: any, record: any) => {
                return (
                    <span>
                          <a href="#" onClick={() => {
                              this.handleChangeRecordClick(record);
                              //console.log("edit", record)
                          }}>
                              изм.
                          </a>
                          <span className="ant-divider"/>
                          <a href="#" style={{color: "crimson"}}>удал.</a>
                    </span>
                )
            }
        };
        this.columns.push(colProps);

    }


    // componentWillReceiveProps(nextProps: IQueryGridProps) {
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
        if (this.props.queryId) {
            this.loadData()
                .then(() => {
                    this.forceUpdate();
                })
                .catch((err: any) => {
                    this.loadDataError = err.toString();
                    this.forceUpdate();
                });
        }

    }

    componentDidUpdate() {
        //console.log("page T didMount");
        if (this.props.queryId && (!this.query || this.props.random !== this.random)) {

            this.loadData()
                .then(() => {
                    this.forceUpdate();
                })
                .catch((err: any) => {
                    this.loadDataError = err.toString();
                    this.forceUpdate();
                });
        }

    }

    handleRefreshButtonClick = () => {
        delete this.query;
        this.forceUpdate();
    };

    handleAddButtonClick = () => {
        this.query.handleAddRecordClick();
    };


    render() {
        //let Column = Table.Column;
        let buttonStyle: CSSProperties = {marginBottom: 12, marginLeft: 12};

        let refreshButtonText = <span><i className="fa fa-refresh" aria-hidden="true"></i><span style={{marginLeft: 5}}>Обновить</span></span>;
        let refreshButton = (
            <Button style={buttonStyle} onClick={this.handleRefreshButtonClick}>
                { this.props.refreshButtonText || refreshButtonText}
            </Button>
        );
        if (!this.props.showRefreshButton)
            refreshButton = null as any;

        let addButton = (
            <Button style={buttonStyle} onClick={this.handleAddButtonClick}>
                { this.props.addButtonText || "Добавить"}
            </Button>
        );
        if (!this.props.showAddButton)
            addButton = null as any;

        if (!this.props.queryId)
            return null;
        else if (this.loadDataError)
            return <div style={{color: "red"}}>ошибка:{this.loadDataError}</div>;
        else if (!this.query)
            return <div>загрузка...</div>;
        else
            return (
                <div>
                    <Row>
                        <Col span={24} style={{textAlign: "right"}}>
                            {addButton}
                            {refreshButton}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table size="middle"
                                   bordered rowKey="name"
                                   dataSource={this.dataSource}
                                   columns={this.columns}
                                   pagination={{pageSize: 100} as any}>
                            </Table>
                        </Col>
                    </Row>
                </div>
            );
    }

}

