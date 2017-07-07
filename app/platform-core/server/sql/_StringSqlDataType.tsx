import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../schema/table/IStringSqlDataTypeProps";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";

export class _StringSqlDataType extends _SqlDataType<IStringSqlDataTypeProps> {
    static className = "string";

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        if (this.props.maxLen && this.props.maxLen !== 0)
            return Sequelize.STRING(this.props.maxLen);
        else
            return Sequelize.TEXT;
    }

}