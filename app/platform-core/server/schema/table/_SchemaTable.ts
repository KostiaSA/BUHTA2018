import {_SchemaObject} from "../_SchemaObject";
import {ISchemaTableProps} from "../../../schema/table/ISchemaTableProps";
import * as Sequelize from "sequelize";
import {_sequelize} from "../../_sequelize";
import {DefineAttributeColumnOptions, DefineAttributes} from "sequelize";
import {_createSqlDataTypeObject} from "./sql/_SqlDataType";
import {ISchemaTableColumnProps} from "../../../schema/table/ISchemaTableColumnProps";
import {SchemaTable} from "../../../schema/table/SchemaTable";
import {rows} from "mssql";

export class _SchemaTable extends _SchemaObject<ISchemaTableProps> {
    static classInfo = {...SchemaTable.classInfo, constructor: _SchemaTable};

    async getSequelizeModel(): Promise<Sequelize.Model<any, any>> {

        let attrs: DefineAttributes = {};

        for (let col of this.props.columns) {

            let dataType = _createSqlDataTypeObject(col.dataType);

            let attr: DefineAttributeColumnOptions = {
                type: await dataType.getSequelizeDataType(),
                primaryKey: col.primaryKey
            };

            attrs[col.name] = attr;

        }

        let model = _sequelize.define(this.props.name, attrs, {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        });

        return model;
    }

    async sync() {
        let model = await this.getSequelizeModel();
        console.log("model-xxx",model);
        await model.sync({alter: true});
    }

    getPrimaryKeyColumn(): ISchemaTableColumnProps {
        for (let col of this.props.columns) {
            if (col.primaryKey)
                return col;
        }
        return undefined as any;
    }

    async upsertRow(props: any) {
        let model = await this.getSequelizeModel();
        model.upsert(props);
    }

    async upsertRows(props: any[]) {
        let model = await this.getSequelizeModel();
        for (let row of props)
            await model.upsert(row);
    }

    async getRow(recordId:any): Promise<any> {
        let model = await this.getSequelizeModel();
        let instance= await model.findByPrimary(recordId);
        return instance.get();
    }

}