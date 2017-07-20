import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../../../schema/table/datatypes/IStringSqlDataTypeProps";
import {DataTypeAbstract, DataTypeAbstractNumber, DataTypeInteger} from "sequelize";
import * as Sequelize from "sequelize";
import {IIntegerSqlDataTypeProps} from "../../../../schema/table/datatypes/IIntegerSqlDataTypeProps";
import {IntegerSqlDataType} from "../../../../schema/table/datatypes/IntegerSqlDataType";

export class _IntegerSqlDataType extends _SqlDataType<IIntegerSqlDataTypeProps> {
    static classInfo = {...IntegerSqlDataType.classInfo, constructor: _IntegerSqlDataType};


    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        let dt: DataTypeAbstractNumber<any>;
        if (this.props.size === "64")
            dt = Sequelize.BIGINT;
        else
            dt = Sequelize.INTEGER;

        if (this.props.unsigned)
            dt = dt.UNSIGNED;

        return {type: dt, autoIncrement: this.props.autoIncrement} as any;
    }

}