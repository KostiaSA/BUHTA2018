import {_createSqlDataTypeObject, _SqlDataType} from "./_SqlDataType";
import {DataTypeAbstract} from "sequelize";
import * as Sequelize from "sequelize";
import {IFkSqlDataTypeProps} from "../../schema/table/IFkSqlDataTypeProps";
import {_loadSchemaObject} from "../_SchemaObject";
import {_SchemaTable} from "../_SchemaTable";
import {clone} from "ejson";

export class _FkSqlDataType extends _SqlDataType<IFkSqlDataTypeProps> {
    static className = "fk";

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        let fkTable = await _loadSchemaObject<_SchemaTable>(this.props.fkTableId);
        let pk = fkTable.getPrimaryKeyColumn();
        if (!pk)
            throw "не найден первичный ключ у таблицы " + fkTable.props.name;
        else
            return _createSqlDataTypeObject(pk.dataType).getSequelizeDataType();
    }

}