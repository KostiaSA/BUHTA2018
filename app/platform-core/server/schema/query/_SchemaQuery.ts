import {_SchemaObject} from "../_SchemaObject";
import {ISchemaQueryProps} from "../../../schema/query/ISchemaQueryProps";
import {SchemaQuery} from "../../../schema/query/SchemaQuery";
import {_SchemaQueryHelper, _SchemaQueryHelperColumn} from "./_SchemaQueryHelper";
import {SqlDialect} from "../../../schema/table/SqlDataType";
import {_SqlSelectEmitter} from "../../sql-emitter/_SqlSelectEmitter";


export class _SchemaQuery extends _SchemaObject<ISchemaQueryProps> {
    static classInfo = {...SchemaQuery.classInfo, constructor: _SchemaQuery};

    private levelToStr(level: number) {
        return Array(level).join("    ");
    }

    async emitColumn(column: _SchemaQueryHelperColumn, emitter: _SqlSelectEmitter, level: number) {

        if (!column.parent) {
            emitter.select.push("SELECT");
            emitter.from.push(this.levelToStr(level) + "FROM");
            emitter.from.push(this.levelToStr(level) + "    " + emitter.identifierToSql(column.joinTable.props.name) + " AS " + emitter.identifierToSql(column.joinTableAlias));
            for (let childColumn of column.columns) {
                await this.emitColumn(childColumn, emitter, level + 1);
            }
        }
        else if (column.joinTable) {
            emitter.from.push(this.levelToStr(level) + "LEFT JOIN " + emitter.identifierToSql(column.joinTable.props.name) + " AS " + emitter.identifierToSql(column.joinTableAlias));
            for (let childColumn of column.columns) {
                await this.emitColumn(childColumn, emitter, level + 1);
            }
            emitter.from.push(
                this.levelToStr(level) +
                "ON " +
                emitter.identifierToSql(column.parent.joinTableAlias) + "." + emitter.identifierToSql(column.props.fieldSource!) +
                "=" +
                emitter.identifierToSql(column.joinTableAlias) + "." + emitter.identifierToSql(column.joinTable.getPrimaryKeyColumn().name));
        }
        else {
            emitter.fields.push(
                "    " +
                emitter.identifierToSql(column.parent.joinTableAlias) + "." + emitter.identifierToSql(column.props.fieldSource!) +
                " AS " +
                emitter.identifierToSql(column.props.fieldCaption!));
        }


    }

    async emitSql(dialect: SqlDialect): Promise<string> {

        let emitter = new _SqlSelectEmitter(dialect);

        let helper = new _SchemaQueryHelper(this.props);
        await helper.createTree();

        await this.emitColumn(helper.root, emitter, 0);

        return emitter.toSql();
    }

}