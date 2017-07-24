import {_SqlDataType} from "./_SqlDataType";
import {IStringSqlDataTypeProps} from "../../../../schema/table/datatypes/IStringSqlDataTypeProps";
import {StringSqlDataType} from "../../../../schema/table/datatypes/StringSqlDataType";
import {_ISqlTableColumn} from "../../database/_SqlTable";
import {ISchemaTableColumnProps} from "../../../../schema/table/ISchemaTableColumnProps";

export class _StringSqlDataType extends _SqlDataType<IStringSqlDataTypeProps> {
    static classInfo = {...StringSqlDataType.classInfo, constructor: _StringSqlDataType};

    async getSqlTableColumns(colProps: ISchemaTableColumnProps): Promise<_ISqlTableColumn[]> {
        let column: _ISqlTableColumn = {
            name: colProps.name,
            dataType: this.props.maxLen === 0 ? "text" : "string",
            dataLen: this.props.maxLen,
            notNull: colProps.notNull,
            primaryKey: colProps.primaryKey,
        };
        return [column];
    }

    // async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
    //     if (this.props.maxLen && this.props.maxLen !== 0)
    //         return Sequelize.STRING(this.props.maxLen);
    //     else
    //         return Sequelize.TEXT;
    // }

}