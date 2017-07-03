import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";

export interface IFormInput {
    label?: string | JSX.Element,
    bindObject: any;
    bindProperty: string;
    placeholder?: string;
    labelCol?: FormItemColOption;
    wrapperCol?: FormItemColOption;
}


export class FormInput extends React.Component<IFormInput, any> {

    getValue(): any {
        if (this.props.bindObject && this.props.bindProperty) {
            return this.props.bindObject[this.props.bindProperty];
        }
        else
            return undefined;
    }

    onChangeHandle = (event: any) => {
        if (this.props.bindObject && this.props.bindProperty) {
            this.props.bindObject[this.props.bindProperty] = event.target.value;
            this.forceUpdate();
        }
    };

    render(): JSX.Element {
        return (
            <Form.Item
                labelCol={this.props.labelCol}
                wrapperCol={this.props.wrapperCol}
                label={this.props.label}
                validateStatus={'success'}
                help={undefined}
            >
                <Input placeholder={this.props.placeholder} value={this.getValue()} onChange={this.onChangeHandle}/>
            </Form.Item>

        );
    }
}