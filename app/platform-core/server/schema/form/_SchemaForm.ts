import {_SchemaObject} from "../_SchemaObject";
import {ISchemaFormProps} from "../../../schema/form/ISchemaFormProps";
import {SchemaForm} from "../../../schema/form/SchemaForm";


export class _SchemaForm extends _SchemaObject<ISchemaFormProps> {
    static classInfo = {...SchemaForm.classInfo, constructor: _SchemaForm};

    private levelToStr(level: number) {
        return Array(level).join("    ");
    }

    // async emitColumn(column: _SchemaFormHelperColumn, emitter: _SqlSelectEmitter, level: number) {
    //
    //     if (!column.parent) {
    //         emitter.select.push("SELECT");
    //         emitter.from.push(this.levelToStr(level) + "FROM");
    //         emitter.from.push(this.levelToStr(level) + "    " + emitter.identifierToSql(column.joinTable.props.name) + " AS " + emitter.identifierToSql(column.joinTableAlias));
    //         for (let childColumn of column.columns) {
    //             await this.emitColumn(childColumn, emitter, level + 1);
    //         }
    //         // добавляем __recordId__
    //         emitter.fields.push(
    //             "    " +
    //             emitter.identifierToSql(column.joinTableAlias) + "." + emitter.identifierToSql(column.joinTable.getPrimaryKeyColumn().name)+
    //             " AS "+emitter.identifierToSql("__recordId__"));
    //
    //     }
    //     else if (column.joinTable) {
    //         emitter.from.push(this.levelToStr(level) + "LEFT JOIN " + emitter.identifierToSql(column.joinTable.props.name) + " AS " + emitter.identifierToSql(column.joinTableAlias));
    //         for (let childColumn of column.columns) {
    //             await this.emitColumn(childColumn, emitter, level + 1);
    //         }
    //         emitter.from.push(
    //             this.levelToStr(level) +
    //             "ON " +
    //             emitter.identifierToSql(column.parent.joinTableAlias) + "." + emitter.identifierToSql(column.props.fieldSource!) +
    //             "=" +
    //             emitter.identifierToSql(column.joinTableAlias) + "." + emitter.identifierToSql(column.joinTable.getPrimaryKeyColumn().name));
    //     }
    //     else {
    //         if (!column.props.isDisabled) {
    //             emitter.fields.push(
    //                 "    " +
    //                 emitter.identifierToSql(column.parent.joinTableAlias) + "." + emitter.identifierToSql(column.props.fieldSource!) +
    //                 " AS " +
    //                 emitter.identifierToSql(column.props.fieldCaption!));
    //         }
    //     }
    //
    //
    // }
    //
    // async emitSql(dialect: SqlDialect): Promise<string> {
    //
    //     let emitter = new _SqlSelectEmitter(dialect);
    //
    //     let helper = new _SchemaFormHelper(this.props);
    //     await helper.createTree();
    //
    //     await this.emitColumn(helper.root, emitter, 0);
    //
    //     return emitter.toSql();
    // }
    //
    // async execute(): Promise<any[]> {
    //     let sql = await this.emitSql(_sequelize.getDialect() as any);
    //     let result = await _sequelize.query(sql);
    //     return result[0];
    // }

}