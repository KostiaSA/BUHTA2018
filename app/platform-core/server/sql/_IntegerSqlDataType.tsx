import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../schema/table/IStringSqlDataTypeProps";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";
import {IIntegerSqlDataTypeProps} from "../../schema/table/IIntegerSqlDataTypeProps";
import {IntegerSqlDataType} from "../../schema/table/IntegerSqlDataType";

export class _IntegerSqlDataType extends _SqlDataType<IIntegerSqlDataTypeProps> {
    static classInfo  = { ...IntegerSqlDataType.classInfo, constructor:_IntegerSqlDataType };


    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        if (this.props.size === "64")
            return Sequelize.BIGINT;
        else
            return Sequelize.INTEGER;
    }

}