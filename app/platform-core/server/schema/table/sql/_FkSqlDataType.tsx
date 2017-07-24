import {_createSqlDataTypeObject, _SqlDataType} from "./_SqlDataType";
import {IFkSqlDataTypeProps} from "../../../../schema/table/datatypes/IFkSqlDataTypeProps";
import {_loadSchemaObject} from "../../_loadSchemaObject";
import {_SchemaTable} from "../_SchemaTable";
import {FkSqlDataType} from "../../../../schema/table/datatypes/FkSqlDataType";
import {ISchemaTableColumnProps} from "../../../../schema/table/ISchemaTableColumnProps";
import {_ISqlTableColumn} from "../../database/_SqlTable";

export class _FkSqlDataType extends _SqlDataType<IFkSqlDataTypeProps> {
    static classInfo = {...FkSqlDataType.classInfo, constructor: _FkSqlDataType};

    async getSqlTableColumns(colProps: ISchemaTableColumnProps): Promise<_ISqlTableColumn[]> {

        let fkTable = await _loadSchemaObject<_SchemaTable>(this.props.fkTableId);
        let pk = fkTable.getPrimaryKeyColumn();
        if (!pk)
            throw "не найден первичный ключ у таблицы " + fkTable.props.name;
        else {
            let fkPkSqlColumns = await _createSqlDataTypeObject(pk.dataType).getSqlTableColumns(pk);

            return fkPkSqlColumns.map((fkPrimaryCol: _ISqlTableColumn) => {
                return {
                    name: colProps.name + "_" + fkPrimaryCol.name,
                    dataType: fkPrimaryCol.dataType,
                    notNull: fkPrimaryCol.notNull,
                    dataLen: fkPrimaryCol.dataLen,
                    decimals: fkPrimaryCol.decimals,
                    primaryKey: false,

                } as _ISqlTableColumn;
            });
        }

    }

    // async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
    //     let fkTable = await _loadSchemaObject<_SchemaTable>(this.props.fkTableId);
    //     let pk = fkTable.getPrimaryKeyColumn();
    //     if (!pk)
    //         throw "не найден первичный ключ у таблицы " + fkTable.props.name;
    //     else
    //         return _createSqlDataTypeObject(pk.dataType).getSequelizeDataType();
    // }

}