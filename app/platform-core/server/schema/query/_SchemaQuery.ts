import {_SchemaObject} from "../_SchemaObject";
import {ISchemaQueryProps} from "../../../schema/query/ISchemaQueryProps";
import {SchemaQuery} from "../../../schema/query/SchemaQuery";
import {_SchemaQueryHelper, _SchemaQueryHelperColumn} from "./_SchemaQueryHelper";
import {SqlDialect} from "../../../schema/table/SqlDataType";
import {_SqlSelectEmitter} from "../../sql-emitter/_SqlSelectEmitter";


export class _SchemaQuery extends _SchemaObject<ISchemaQueryProps> {
    static classInfo = {...SchemaQuery.classInfo, constructor: _SchemaQuery};

    private levelToStr(level: number) {
        return Array(level).join(" ");
    }

    async emitColumn(column: _SchemaQueryHelperColumn, emitter: _SqlSelectEmitter, level: number) {

        if (!column.parent) {
            emitter.select.push("SELECT");
            emitter.from.push(this.levelToStr(level) + "FROM");
            emitter.from.push(this.levelToStr(level) + "  " + emitter.identifierToSql(column.joinTable.props.name));
        }
        else if (column.joinTable) {
            emitter.from.push(this.levelToStr(level) + "LEFT JOIN " + emitter.identifierToSql(column.joinTable.props.name) + " ON ");
        }
        else {
            emitter.fields.push(this.levelToStr(level) + "  " + emitter.identifierToSql(column.parent.joinTable.props.name) + "." + emitter.identifierToSql(column.props.fieldSource!) + " AS " + emitter.identifierToSql(column.props.fieldCaption!));
        }


        for (let childColumn of column.columns) {
            await this.emitColumn(childColumn, emitter, level + 1);
        }
    }

    async emitSql(dialect: SqlDialect): Promise<string> {

        let emitter = new _SqlSelectEmitter(dialect);


        let helper = new _SchemaQueryHelper(this.props);
        await helper.createTree();

        await this.emitColumn(helper.root, emitter, 0);

        return emitter.toSql();
        // return [
        //     emitter.select.join("\n"),
        //     emitter.fields.join(",\n"),
        //     emitter.from.join("\n"),
        //     emitter.where.join("\n")
        // ].join("\n");
    }

}