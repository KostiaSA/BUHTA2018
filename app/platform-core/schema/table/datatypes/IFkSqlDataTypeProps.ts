import {ISqlDataTypeProps} from "./ISqlDataTypeProps";

export interface IFkSqlDataTypeProps extends ISqlDataTypeProps {
    fkTableId: string;
}

