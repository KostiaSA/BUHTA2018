import {ISchemaObjectProps} from "../ISchemaObject";
import {ISchemaQueryColumnProps} from "./ISchemaQueryColumnProps";
import {ISchemaTableEditOptions} from "../table/ISchemaTableEditOptions";


export interface ISchemaQueryProps extends ISchemaObjectProps,ISchemaQueryColumnProps {
    editOptions?: ISchemaTableEditOptions;
}

