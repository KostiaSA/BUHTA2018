import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {CSSProperties, HTMLAttributes, PropTypes} from "react";

export interface IFormSaveButtonProps{
    text?: string | JSX.Element,
    style?: CSSProperties,
}


export class FormSaveButton extends React.Component<IFormSaveButtonProps, any> {

    static contextTypes = {
        onClickSaveButton: PropTypes.func,
        isInsertMode:PropTypes.bool,
    };


    render(): JSX.Element {
        return (
            <Button style={this.props.style} type="primary"  onClick={this.context.onClickSaveButton}>{this.props.text || "Сохранить"}</Button>

        );
    }
}