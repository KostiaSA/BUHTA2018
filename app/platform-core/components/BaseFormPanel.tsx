import * as React from "react";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';

import {FormCreateOption, WrappedFormUtils} from "antd/es/form/Form";
import {PropTypes} from "react";

export interface IFormPanelProps {
    editedObject: any;
    onFieldsChange?: (fields: Array<any>) => void;
    onSave?: () => void;
    onCancel?: () => void;
    form?: WrappedFormUtils;

}

export class BaseFormPanel extends React.Component<IFormPanelProps, any> {

    static formOptions: FormCreateOption = {
        onFieldsChange: (props: IFormPanelProps, fields: any) => {

            for (let propName in fields) {
                props.editedObject[propName] = fields[propName].value;
            }

            if (props.onFieldsChange) {
                props.onFieldsChange(fields);
            }

        }
    };

    onClickSaveButton = () => {
        console.log("handleClickSaveButton");
        this.props.form!.validateFields((erros: any, values: any) => {
            console.log("validateFields", erros, values);
            if (!erros && this.props.onSave) {
                this.props.onSave();
            }
        })
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
        onClickSaveButton:PropTypes.func,
    };

}
