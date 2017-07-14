import * as React from "react";
import {message, Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormCreateOption, WrappedFormUtils} from "antd/es/form/Form";
import {PropTypes} from "react";
var objectPath = require("object-path");

export interface IFormPanelProps {
    editedObject: any;
    onFieldsChange?: (fields: Array<any>) => void;
    onSave?: () => void;
    onCancel?: () => void;
    form?: WrappedFormUtils;
    panelRef?: (formPanel: BaseFormPanel) => void;

}

export class BaseFormPanel extends React.Component<IFormPanelProps, any> {

    static formOptions: FormCreateOption = {
        onFieldsChange: (props: IFormPanelProps, fields: any) => {

            for (let propName in fields) {
                if (props.editedObject) {
                    //props.editedObject[propName] = fields[propName].value;
                    objectPath.set(props.editedObject,propName,fields[propName].value)

                }
            }

            if (props.onFieldsChange) {
                props.onFieldsChange(fields);
            }

        },
    };

    componentDidMount() {
        if (this.props.panelRef) {
            this.props.panelRef(this);
        }
    }

    componentDidUpdate(){
        // не удалять
    }

    componentWillUnmount() {
        // не удалять
    }

    onClickSaveButton = () => {
        //console.log("handleClickSaveButton");
        this.props.form!.validateFields((errors: any, values: any) => {
            //console.log("validateFields", erros, values);
            if (!errors) {
                if (this.props.onSave)
                    this.props.onSave();
            }
            else {

                let errorList: JSX.Element[] = [];
                for (let err in errors) {
                    errorList.push(<li>{errors[err].errors[0].message}</li>)
                }

                let msg = (
                    <span>
                        <span>Есть ошибки, сохранение невозможно!!</span>
                        <ul style={{
                            listStyleType: "square",
                            listStylePosition: "inside",
                            color: "indianred"
                        }}>
                        {errorList}
                        </ul>
                    </span>
                );

                message.error(msg);
                console.log("Есть ошибки, сохранение невозможно!", errors);
            }
        })
    };

    async validateFieldsOk(): Promise<boolean> {
        return new Promise<boolean>(
            (resolve: (obj: boolean) => void, reject: (error: string) => void) => {
                this.props.form!.validateFields((erros: any, values: any) => {
                    resolve(!erros);
                });
            });
    };

    getChildContext() {
        return {
            form: this.props.form,
            bindObject: this.props.editedObject,
            onClickSaveButton: this.onClickSaveButton
        };
    }

    static childContextTypes = {
        form: PropTypes.object,
        bindObject: PropTypes.object,
        onClickSaveButton: PropTypes.func,
    };

}

