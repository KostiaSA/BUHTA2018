import {_SchemaObject} from "./_SchemaObject";
import {ISchemaTableProps} from "../schema/table/ISchemaTableProps";
import * as Sequelize from "sequelize";
import {_sequelize} from "./_sequelize";
import {DefineAttributeColumnOptions, DefineAttributes} from "sequelize";
import {_createSqlDataTypeObject} from "./sql/_SqlDataType";
import {ISchemaTableColumnProps} from "../schema/table/ISchemaTableColumnProps";
import {ISchemaPageProps} from "../schema/ISchemaPage";

export class _SchemaPage extends _SchemaObject<ISchemaPageProps> {
    static className = "platform-core:SchemaPage";
}