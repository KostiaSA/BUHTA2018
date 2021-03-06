import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    AutoComplete,
    Tooltip,
    Checkbox,
    Radio,
    Select,
    Icon,
    Input,
    Button,
    Form,
    Row,
    Col,
    LocaleProvider,
    DatePicker
} from 'antd';
import {FormItemColOption} from "antd/es/form/FormItem";
import {ValidationRule, WrappedFormUtils} from "antd/es/form/Form";
import {CSSProperties, PropTypes} from "react";
import {isArray, isNumber, isString} from "util";

var objectPath = require("object-path");


export type InputMode = "input" | "select" | "radio" | "checkbox" | "lookup";


export interface IFormInput {
    label?: string | JSX.Element,
    bindProperty: string;
    placeholder?: string;
    labelCol?: FormItemColOption;
    wrapperCol?: FormItemColOption;
    hidden?: boolean;
    rules?: ValidationRule[];
    mode: InputMode;
    selectValues?: any[];
    style?: CSSProperties;
    defaultValue?: any;
    tooltip?: string | JSX.Element;
    //onChange?: (value: any) => void;
}


export class FormInput extends React.Component<IFormInput, any> {

    static contextTypes = {
        form: PropTypes.any,
        bindObject: PropTypes.any,
    };


    state = {
        lookupSearchValue: ""
    };

    renderMode(): JSX.Element {
        if (this.props.mode === "input") {
            return (
                <Input
                    style={this.props.style}
                    placeholder={this.props.placeholder}
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
                >
                    {renderOptions()}
                </Select>
            )
        }
        else if (this.props.mode === "lookup") {

            let datasource: any[] = [];
            if (this.props.selectValues) {
                datasource = this.props.selectValues
                    .map<JSX.Element>((value: any, index: number) => {
                        if (isString(value) || isNumber(value)) {
                            return {value: value, text: value};
                        }
                        else if (isArray(value)) {
                            return {value: value[0].toString(), text: value[1].toString()};
                        }
                        else
                            return value;
                    })
                    .filter((obj: any) => {
                        return this.state.lookupSearchValue === "" || obj.value.toString() === this.state.lookupSearchValue || obj.text.indexOf(this.state.lookupSearchValue) >= 0
                    });
            }

            //console.log("datasource", datasource);

            return (
                <AutoComplete
                    dataSource={datasource}
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    onSearch={(text) => {
                        this.state.lookupSearchValue = text;
                        this.setState(this.state);
                        console.log("search", text)
                    }}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
                </AutoComplete>
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
        let initValue = objectPath.get(bindObject, this.props.bindProperty, this.props.defaultValue);
        // if (!initValue)
        //     initValue = this.props.defaultValue;

        if (bindObject && !this.props.hidden) {
            return (
                <Form.Item
                    labelCol={labelCol}
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