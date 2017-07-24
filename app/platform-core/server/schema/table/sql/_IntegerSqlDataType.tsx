import {_SqlDataType} from "./_SqlDataType";
import {IIntegerSqlDataTypeProps} from "../../../../schema/table/datatypes/IIntegerSqlDataTypeProps";
import {IntegerSqlDataType} from "../../../../schema/table/datatypes/IntegerSqlDataType";
import {ISchemaTableColumnProps} from "../../../../schema/table/ISchemaTableColumnProps";
import {_ISqlTableColumn} from "../../database/_SqlTable";

export class _IntegerSqlDataType extends _SqlDataType<IIntegerSqlDataTypeProps> {
    static classInfo = {...IntegerSqlDataType.classInfo, constructor: _IntegerSqlDataType};


    async getSqlTableColumns(colProps: ISchemaTableColumnProps): Promise<_ISqlTableColumn[]> {
        let column: _ISqlTableColumn = {
            name: colProps.name,
            dataType: "int",
            notNull: colProps.notNull,
            primaryKey: colProps.primaryKey,
        };

        if (this.props.size === "8" && this.props.unsigned)
            column.dataType = "byte";
        else
        if (this.props.size === "8" && !this.props.unsigned)
            column.dataType = "sbyte";
        else
        if (this.props.size === "16" && this.props.unsigned)
            column.dataType = "ushort";
        else
        if (this.props.size === "16" && !this.props.unsigned)
            column.dataType = "short";
        else
        if (this.props.size === "32" && this.props.unsigned)
            column.dataType = "uint";
        else
        if (this.props.size === "32" && !this.props.unsigned)
            column.dataType = "int";
        else
        if (this.props.size === "64" && this.props.unsigned)
            column.dataType = "ulong";
        else
        if (this.props.size === "64" && !this.props.unsigned)
            column.dataType = "long";

        return [column];
    }

    // async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
    //     let dt: DataTypeAbstractNumber<any>;
    //     if (this.props.size === "64")
    //         dt = Sequelize.BIGINT;
    //     else
    //         dt = Sequelize.INTEGER;
    //
    //     if (this.props.unsigned)
    //         dt = dt.UNSIGNED;
    //
    //     return {type: dt, autoIncrement: this.props.autoIncrement} as any;
    // }

}