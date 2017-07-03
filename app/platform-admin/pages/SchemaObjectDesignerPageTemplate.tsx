import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {PageTemplate} from "../../platform-core/components/PageTemplate";
import {AdminMainPageTemplate} from "./AdminMainPageTemplate";
import {createSchemaObject, SchemaObject} from "../../platform-core/schema/SchemaObject";
import {getParamFromUrl} from "../../platform-core/utils/getQueryParamFromUrl";
import {ISchemaObjectProps} from "../../platform-core/schema/ISchemaObject";

export interface ISchemaObjectDesignerPageTemplateProps {

}

export class SchemaObjectDesignerPageTemplate extends AdminMainPageTemplate {

    static pageTemplateId: string = "platform-admin/pages/SchemaObjectDesignerPageTemplate";
    static pageTemplateName: string = "шаблон страницы редактирования schemaobject";

    //orginalObjectPropsJson: string;
    designedObject: SchemaObject<ISchemaObjectProps>;

    private history: string[] = [];
    private lastTrackedJson: string;
    private trackCount: number;
    needSave: boolean;

    trackChanges = () => {
        if (this.designedObject) {
            let propsJson = JSON.stringify(this.designedObject.props);

            if (this.history.length === 0) {
                this.history.push(propsJson);
                this.lastTrackedJson = propsJson;
                this.trackCount = 0;
                this.forceUpdate();
                //console.log("track-NEW-history");
            }
            else if (this.history[this.history.length - 1] !== propsJson) {
                if (propsJson === this.lastTrackedJson) {
                    this.trackCount++;
                    if (this.trackCount > 5) {
                        this.history.push(propsJson);
                        this.trackCount = 0;
                        this.forceUpdate();
                        //console.log("track-add-history", this.history.length);
                    }
                }
                else {
                    this.lastTrackedJson = propsJson;
                    this.trackCount = 0;
                    //console.log("track-forceUpdate");
                    this.forceUpdate();
                }
                if (this.needSave !== true) {
                    this.needSave = true;
                    this.forceUpdate();
                }

            }
        }

    };

    doUndo() {
        this.history.pop();
        let lastJson = this.history[this.history.length - 1];
        //console.log("lastJson", lastJson);
        this.designedObject.props = JSON.parse(lastJson!);
        this.lastTrackedJson = lastJson!;
        this.trackCount = 0;
        this.needSave = this.history.length !== 1;
        this.forceUpdate();
    }


    renderTop(): JSX.Element {
        return (
            <div>{super.renderTop()}дизайнер schema object НАЧАЛО:
                <h2>{this.designedObject.props.name}</h2>
            </div>
        );
    }

    async saveDesignedObject() {
        await this.designedObject.save();
        this.history.length = 0;
        this.needSave = false;
        this.forceUpdate();
        console.log("объект сохранен");
    };

    renderBottom(): JSX.Element {
        return (
            <div>дизайнер schema object КОНЕЦ
                <Button
                    disabled={!this.needSave}
                    onClick={() => {
                        this.saveDesignedObject()
                    }}>
                    Сохранить
                </Button>
                <Button
                    disabled={this.history.length < 2}
                    onClick={() => {
                        this.doUndo()
                    }}>
                    Undo
                </Button>
                {super.renderBottom()}
            </div>
        );
    }

    async loadData() {

        await super.loadData();
        console.log("load schema object");
        if (!this.designedObject) {
            let designedObjectId = getParamFromUrl("objectid");
            if (designedObjectId) {
                this.designedObject = await createSchemaObject(designedObjectId);
                setInterval(this.trackChanges, 100);
                //this.orginalObjectPropsJson = JSON.stringify(this.designedObject.props);
            }
        }
    }

    // render() {
    //     console.log("render SchemaObjectDesignerPageTemplate");
    //     if (this.designedObject) {
    //         let props = this.designedObject.props;
    //
    //         let xxx = observable(this.designedObject.props);
    //         observe(xxx, "name", (change) => {
    //             console.log("name changed to ", change.newValue);
    //         });
    //         autorun(() => {
    //             console.log("autorun========", this.designedObject.props.name)
    //         });
    //
    //         setInterval(() => {
    //             console.log("autorun==INTEVLA======", this.designedObject.props.name)
    //         }, 1000);
    //
    //
    //         return super.render();
    //     }
    //     else
    //         return super.render();
    //     //     let props = this.designedObject;
    //     //     console.log("render SchemaObjectDesignerPageTemplate");
    //     //     return <div>{super.render()}{this.designedObject||"?"}</div> ;
    // }

}