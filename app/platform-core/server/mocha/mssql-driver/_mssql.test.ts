import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {assert} from "chai";
import {_MsSqlDriver} from "../../schema/database/_MsSqlDriver";
import {_loadSchemaObject} from "../../schema/_loadSchemaObject";
import {_SchemaDatabase} from "../../schema/database/_SchemaDatabase";
import {CoreConst} from "../../../CoreConst";
import {SchemaDatabase} from "../../../schema/database/SchemaDatabase";
import {_ISqlTable} from "../../schema/database/_SqlTable";
import {_SqlCreateTableEmitter} from "../../sql-emitter/_SqlCreateTableEmitter";
import {SqlDialect} from "../../../schema/table/datatypes/SqlDataType";
import {getRandomString} from "../../../utils/getRandomString";

type Done = () => void;

@suite("mssql-driver")
//@skip
export class Test {

    static driver: _MsSqlDriver;
    static dialect: SqlDialect = "mssql";

    static async before() {
        let db = await _loadSchemaObject<_SchemaDatabase>(SchemaDatabase.classInfo.recordIdPrefix + ":" + CoreConst.Schema_DatabaseId);
        this.driver = new _MsSqlDriver(db.props);
    }


    table: _ISqlTable = {
        name: "__test_table__" + getRandomString(),
        columns: [
            {
                name: "pkColumn",
                dataType: "int",
                primaryKey: true,
            },
            {
                name: "byteColumn",
                dataType: "byte"
            },
            {
                name: "sbyteColumn",
                dataType: "sbyte"
            },
            {
                name: "shortColumn",
                dataType: "short"
            },
            {
                name: "ushortColumn",
                dataType: "ushort"
            },
            {
                name: "intColumn1",
                dataType: "int"
            },
            {
                name: "uintColumn1",
                dataType: "uint"
            }
        ]
    }


    @test
    async connection() {
        await Test.driver.connect();
        assert.equal("1", "1");
    }

    @test
    async execute_101_202() {
        let result = await Test.driver.executeSqlBatch(["SELECT '101' as p101", "SELECT '202' as p202"]);
        assert.equal(result[0][0].p101, "101");
        assert.equal(result[1][0].p202, "202");
    }

    @test
    async create_table() {
        let emitter = new _SqlCreateTableEmitter(Test.dialect, this.table);
        //console.log(emitter.toSql());

        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
        // console.log(result);
        // assert.equal(result[0][0].p101, "101");
        // assert.equal(result[1][0].p202, "202");
    }

    @test
    async drop_table() {
        let emitter = new _SqlDropTableEmitter(Test.dialect, this.table);
        console.log(emitter.toSql());
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }
}