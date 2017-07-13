import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../../../schema/table/datatypes/IStringSqlDataTypeProps";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";
import {IIntegerSqlDataTypeProps} from "../../../../schema/table/datatypes/IIntegerSqlDataTypeProps";
import {IntegerSqlDataType} from "../../../../schema/table/datatypes/IntegerSqlDataType";

export class _IntegerSqlDataType extends _SqlDataType<IIntegerSqlDataTypeProps> {
    static classInfo  = { ...IntegerSqlDataType.classInfo, constructor:_IntegerSqlDataType };


    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        if (this.props.size === "64")
            return Sequelize.BIGINT;
        else
            return Sequelize.INTEGER;
    }

}