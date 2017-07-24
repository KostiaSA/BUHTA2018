import {_SchemaObject} from "../_SchemaObject";
import {ISchemaTableProps} from "../../../schema/table/ISchemaTableProps";

import {ISchemaTableColumnProps} from "../../../schema/table/ISchemaTableColumnProps";
import {SchemaTable} from "../../../schema/table/SchemaTable";
import {rows} from "mssql";
import {_ISqlTable} from "../database/_SqlTable";
import {_createSqlDataTypeObject} from "./sql/_SqlDataType";

export class _SchemaTable extends _SchemaObject<ISchemaTableProps> {
    static classInfo = {...SchemaTable.classInfo, constructor: _SchemaTable};

    async getSqlTable(): Promise<_ISqlTable> {

        let table: _ISqlTable = {
            name: this.props.name,
            columns: []
        };

        for (let col of this.props.columns) {

            let dataType = _createSqlDataTypeObject(col.dataType);

            let cols = await dataType.getSqlTableColumns(col);

            cols.forEach((col) => {
                table.columns.push(col)
            });

        }

        return table;

    }

    // async getSequelizeModel(): Promise<Sequelize.Model<any, any>> {
    //     throw "?"
    //     //
    //     // let attrs: DefineAttributes = {};
    //     //
    //     // for (let col of this.props.columns) {
    //     //
    //     //     let dataType = _createSqlDataTypeObject(col.dataType);
    //     //
    //     //     let attr: DefineAttributeColumnOptions = {
    //     //         type: await dataType.getSequelizeDataType(),
    //     //         primaryKey: col.primaryKey
    //     //     };
    //     //
    //     //     attrs[col.name] = attr;
    //     //
    //     // }
    //     //
    //     // let model = _sequelize.define(this.props.name, attrs, {
    //     //     freezeTableName: true,
    //     //     createdAt: false,
    //     //     updatedAt: false
    //     // });
    //     //
    //     // return model;
    // }

    async sync() {
        // let model = await this.getSequelizeModel();
        // console.log("model-xxx", model);
        // await model.sync({alter: true});
    }

    getPrimaryKeyColumn(): ISchemaTableColumnProps {
        for (let col of this.props.columns) {
            if (col.primaryKey)
                return col;
        }
        return undefined as any;
    }

    async upsertRow(props: any) {
        //let model = await this.getSequelizeModel();
        //model.upsert(props);
    }

    async upsertRows(props: any[]) {
        // let model = await this.getSequelizeModel();
        // for (let row of props)
        //     await model.upsert(row);
    }

    // async getRow(recordId: any): Promise<any> {
    //     // let model = await this.getSequelizeModel();
    //     // let instance = await model.findByPrimary(recordId);
    //     // return instance.get();
    // }

}