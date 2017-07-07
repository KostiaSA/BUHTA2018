import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../schema/table/IStringSqlDataTypeProps";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";
import {IIntegerSqlDataTypeProps} from "../../schema/table/IIntegerSqlDataTypeProps";

export class _IntegerSqlDataType extends _SqlDataType<IIntegerSqlDataTypeProps> {
    static className = "integer";

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        if (this.props.size === "64")
            return Sequelize.BIGINT;
        else
            return Sequelize.INTEGER;
    }

}