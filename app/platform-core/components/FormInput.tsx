import * as React from "react";
import * as ReactDOM from "react-dom";
import {Tooltip, Checkbox, Radio, Select, Icon, Input, Button, Form, Row, Col, LocaleProvider, DatePicker} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {CSSProperties, PropTypes} from "react";
import {isArray, isNumber, isString} from "util";
var objectPath = require("object-path");

export interface IFormInput {
    label?: string | JSX.Element,
    bindProperty: string;
    placeholder?: string;
    labelCol?: FormItemColOption;
    wrapperCol?: FormItemColOption;
    rules?: ValidationRule[];
    mode: "input" | "select" | "radio" | "checkbox";
    selectValues?: any[];
    style?: CSSProperties;
    defaultValue?: any;
    tooltip?: string | JSX.Element;
    onChange?: (value: any) => void;
}


export class FormInput extends React.Component<IFormInput, any> {

    static contextTypes = {
        form: PropTypes.any,
        bindObject: PropTypes.any,
    };

    renderMode(): JSX.Element {
        if (this.props.mode === "input") {
            return (
                <Input
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    onChange={(value) => {
                        //let bindObject = this.props.bindObject || this.context.bindObject;
                        //bindObject[this.props.bindProperty] = value;
                        //if (this.props.onChange)
                        //  this.props.onChange(value)
                    }}
                />
            )
        }
        else if (this.props.mode === "checkbox") {
            return <Checkbox style={this.props.style}>{this.props.label}</Checkbox>
        }
        else if (this.props.mode === "select") {
            let renderOptions = (): JSX.Element[] => {
                if (!this.props.selectValues) {
                    return [];
                }
                else {
                    return this.props.selectValues.map<JSX.Element>((value: any, index: number) => {
                        if (isString(value) || isNumber(value)) {
                            return <Select.Option value={value.toString()}>{value.toString()}</Select.Option>;
                        }
                        else if (isArray(value)) {
                            return <Select.Option value={value[0].toString()}>{value[1].toString()}</Select.Option>;
                        }
                        else
                            return <Select.Option value="0">неверный тип: {value.toString()} </Select.Option>;
                    });
                }
            };
            return (
                <Select
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    onChange={(value) => {
                        //let bindObject = this.props.bindObject || this.context.bindObject;
                        //bindObject[this.props.bindProperty] = value;
                        //if (this.props.onChange)
//                            this.props.onChange(value)
                    }}
                >
                    {renderOptions()}
                </Select>
            )
        }
        else if (this.props.mode === "radio") {
            let renderOptions = (): JSX.Element[] => {
                if (!this.props.selectValues) {
                    return [];
                }
                else {
                    return this.props.selectValues.map<JSX.Element>((value: any, index: number) => {
                        if (isString(value) || isNumber(value)) {
                            return <Radio value={value.toString()}>{value.toString()}</Radio>;
                        }
                        else if (isArray(value)) {
                            return <Radio value={value[0].toString()}>{value[1].toString()}</Radio>;
                        }
                        else
                            return <Radio value="0">неверный тип: {value.toString()} </Radio>;
                    });
                }
            };
            return <Radio.Group style={this.props.style}>{renderOptions()}</Radio.Group>
        }
        else
            return <span style={{color: "red"}}>INVALID INPUT MODE</span>;
    }

    render(): JSX.Element {
        let form = this.context.form;
        let bindObject = this.context.bindObject;

        let labelCol = this.props.labelCol as any;
        let wrapperCol = this.props.wrapperCol as any;

        let valuePropName = "value";
        let label = this.props.label;

        if (this.props.tooltip) {
            label = (
                <span>
                    {label}&nbsp;
                    <Tooltip title={this.props.tooltip}>
                       <Icon type="question-circle-o"/>
                     </Tooltip>
                </span>
            )
        }

        if (this.props.mode === "checkbox") {
            wrapperCol = {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: wrapperCol.sm.span,
                    offset: labelCol.sm.span,
                },
            };

            valuePropName = "checked";
            label = null as any;

        }

        //let initValue = bindObject[this.props.bindProperty];
        let initValue = objectPath.get(bindObject, this.props.bindProperty,this.props.defaultValue);
         // if (!initValue)
         //     initValue = this.props.defaultValue;

        if (bindObject) {
            return (
                <Form.Item
                    labelCol={ labelCol}
                    wrapperCol={wrapperCol}
                    label={label}
                >
                    {form.getFieldDecorator(this.props.bindProperty, {
                        initialValue: initValue,
                        rules: this.props.rules,
                        valuePropName: valuePropName,
                    })(
                        this.renderMode()
                    )}

                </Form.Item>

            );
        }
        else
            return null as any;
    }
}