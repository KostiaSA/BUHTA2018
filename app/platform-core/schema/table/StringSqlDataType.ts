import {SqlDataType} from "./SqlDataType";
import {IStringSqlDataTypeProps} from "./IStringSqlDataTypeProps";

export class StringSqlDataType extends SqlDataType<IStringSqlDataTypeProps>{
    static className = "string";

}