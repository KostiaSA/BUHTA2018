import {_SchemaObject} from "./_SchemaObject";
import {ISchemaTableProps} from "../schema/table/ISchemaTableProps";
import * as Sequelize from "sequelize";
import {_sequelize} from "./_sequelize";
import {DefineAttributeColumnOptions, DefineAttributes} from "sequelize";
import {_createSqlDataTypeObject} from "./sql/_SqlDataType";

export class _SchemaTable extends _SchemaObject<ISchemaTableProps> {

    getSequelizeModel(): Sequelize.Model<any, any> {

        let attrs: DefineAttributes = {};

        for (let col of this.props.columns) {

            let dataType = _createSqlDataTypeObject(col.dataType);

            let attr: DefineAttributeColumnOptions = {
                type: dataType.getSequelizeDataType()
            };

            attrs[col.name] = attr;

        }

        let model = _sequelize.define(this.props.name, attrs, {freezeTableName: true});

        return model;
    }

    async sync() {
        await this.getSequelizeModel().sync({alter: true});
    }
}