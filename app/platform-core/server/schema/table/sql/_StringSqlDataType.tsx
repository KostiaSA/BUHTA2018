import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../../../schema/table/datatypes/IStringSqlDataTypeProps";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";
import {StringSqlDataType} from "../../../../schema/table/datatypes/StringSqlDataType";

export class _StringSqlDataType extends _SqlDataType<IStringSqlDataTypeProps> {
    static classInfo  = { ...StringSqlDataType.classInfo, constructor:_StringSqlDataType };

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        if (this.props.maxLen && this.props.maxLen !== 0)
            return Sequelize.STRING(this.props.maxLen);
        else
            return Sequelize.TEXT;
    }

}