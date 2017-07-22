// import {_createSqlDataTypeObject, _SqlDataType} from "./_SqlDataType";
// import {DataTypeAbstract} from "sequelize";
// import * as Sequelize from "sequelize";
// import {IFkSqlDataTypeProps} from "../../../../schema/table/datatypes/IFkSqlDataTypeProps";
// import {_loadSchemaObject} from "../../_loadSchemaObject";
// import {_SchemaTable} from "../_SchemaTable";
// import {clone} from "ejson";
// import {FkSqlDataType} from "../../../../schema/table/datatypes/FkSqlDataType";
//
// export class _FkSqlDataType extends _SqlDataType<IFkSqlDataTypeProps> {
//     static classInfo  = { ...FkSqlDataType.classInfo, constructor:_FkSqlDataType };
//
//     async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
//         let fkTable = await _loadSchemaObject<_SchemaTable>(this.props.fkTableId);
//         let pk = fkTable.getPrimaryKeyColumn();
//         if (!pk)
//             throw "не найден первичный ключ у таблицы " + fkTable.props.name;
//         else
//             return _createSqlDataTypeObject(pk.dataType).getSequelizeDataType();
//     }
//
// }