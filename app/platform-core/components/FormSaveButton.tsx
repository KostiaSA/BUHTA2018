import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {PropTypes} from "react";

export interface IFormSaveButtonProps {
    label?: string | JSX.Element,
}


export class FormSaveButton extends React.Component<IFormSaveButtonProps, any> {

    static contextTypes = {
        onClickSaveButton: PropTypes.func,
    };


    render(): JSX.Element {
        return (
            <Button type="primary" onClick={this.context.onClickSaveButton}>{this.props.label || "Сохранить"}</Button>

        );
    }
}