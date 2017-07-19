import {InputMode} from "../../components/FormInput";

export interface IFormInputOptions {
    label?: string;
    placeholder?: string;
    readOnly?: boolean;
    mode?: InputMode;
    maxWidth?: number;
    required?:boolean;
    requiredMessage?:string;
}

