
import {SqlDialect} from "../../../../schema/table/datatypes/SqlDataType";

export interface _ISqlDataType{
    getSqlDeclare(dialect:SqlDialect):string;
}

// export class _BaseSqlDataType implements {
//
// }