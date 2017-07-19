import {IFormInputOptions} from "./IFormInputOptions";

export interface ISchemaFormFieldProps {
    type: "root" | "tab" | "group" | "field"
    key: string;
    fieldName: string;  // название поля - источника или название группы/таба
    isDisabled?: boolean;
    isHidden?: boolean;
    children?: ISchemaFormFieldProps[];
    formInputOptions?: IFormInputOptions;
}

