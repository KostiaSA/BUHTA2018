import {_SchemaObject} from "../_SchemaObject";
import {ISchemaQueryProps} from "../../../schema/query/ISchemaQueryProps";
import {SchemaQuery} from "../../../schema/query/SchemaQuery";
import {_SchemaQueryHelper, _SchemaQueryHelperColumn} from "./_SchemaQueryHelper";
import {SqlDialect} from "../../../schema/table/datatypes/SqlDataType";
import {_SqlSelectEmitter} from "../../sql-emitter/_SqlSelectEmitter";
import {_loadSchemaObject} from "../_loadSchemaObject";
import {_SchemaDatabase} from "../database/_SchemaDatabase";


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
            // добавляем __recordId__
            emitter.fields.push(
                "    " +
                emitter.identifierToSql(column.joinTableAlias) + "." + emitter.identifierToSql(column.joinTable.getPrimaryKeyColumn().name) +
                " AS " + emitter.identifierToSql("__recordId__"));

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
            if (!column.props.isDisabled) {
                emitter.fields.push(
                    "    " +
                    emitter.identifierToSql(column.parent.joinTableAlias) + "." + emitter.identifierToSql(column.props.fieldSource!) +
                    " AS " +
                    emitter.identifierToSql(column.props.fieldCaption!));
            }
        }


    }

    async emitSql(dialect: SqlDialect): Promise<string> {

        let emitter = new _SqlSelectEmitter(dialect);

        let helper = new _SchemaQueryHelper(this.props);
        await helper.createTree();

        await this.emitColumn(helper.root, emitter, 0);

        return emitter.toSql();
    }

    async execute(dbId: string): Promise<any[]> {
        let db = await _loadSchemaObject<_SchemaDatabase>(dbId);
        let sql = await this.emitSql(db.props.sqlDialect);
        let result = await db.executeSqlBatch([sql]);
        console.log(sql,result[0]);

        return result[0];
    }

}