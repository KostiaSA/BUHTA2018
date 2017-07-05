import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {PropTypes} from "react";

export interface IFormInput {
    label?: string | JSX.Element,
    bindProperty: string;
    placeholder?: string;
    labelCol?: FormItemColOption;
    wrapperCol?: FormItemColOption;
    rules?: ValidationRule[];
}


export class FormInput extends React.Component<IFormInput, any> {

    static contextTypes = {
        form: PropTypes.any,
        bindObject: PropTypes.any,
    };

    render(): JSX.Element {
        let form = this.context.form;
        let bindObject = this.context.bindObject;
        if (bindObject) {
            return (
                <Form.Item
                    labelCol={this.props.labelCol}
                    wrapperCol={this.props.wrapperCol}
                    label={this.props.label}
                >
                    {form.getFieldDecorator(this.props.bindProperty, {
                        initialValue: bindObject[this.props.bindProperty],
                        rules: this.props.rules,
                    })(
                        <Input placeholder={this.props.placeholder}/>
                    )}

                </Form.Item>

            );
        }
        else
            return null as any;
    }
}