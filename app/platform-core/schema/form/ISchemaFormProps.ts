import {ISchemaObjectProps} from "../ISchemaObject";
import {ISchemaFormFieldProps} from "./ISchemaFormFieldProps";


export interface ISchemaFormProps extends ISchemaObjectProps,ISchemaFormFieldProps {
    tableId?: string;

}

