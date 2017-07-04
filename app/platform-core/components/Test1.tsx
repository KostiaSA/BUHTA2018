import * as React from "react";
import * as ReactDOM from "react-dom";
import {Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {PropTypes} from "react";
import {FormInput} from "./FormInput";



export class Test1 extends React.Component<any, any> {

    render(): JSX.Element {
        //let form = this.context.form;
        //let bindObject = this.context.bindObject;


        return (
            <div>wwwwwwwwwwwwwwwww
                <FormInput

                    label="name3"
                    bindProperty="name"
                    rules={[{required: true, message: 'введи name3!'}]}
                />
                <FormInput

                    label="description3"
                    bindProperty="description"
                    rules={[{required: true, message: 'введи description3!'}]}
                />

            </div>

        );
    }
}