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
import {_SqlDropTableEmitter} from "../../sql-emitter/_SqlDropTableEmitter";
import {_SqlInsertTableRowEmitter} from "../../sql-emitter/_SqlInsertTableRowEmitter";

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


    static table: _ISqlTable = {
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
            },
            {
                name: "longColumn1",
                dataType: "long"
            },
            {
                name: "ulongColumn1",
                dataType: "ulong"
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
        let emitter = new _SqlCreateTableEmitter(Test.dialect, Test.table);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }

    @test
    async insert() {

        let row={
            pkColumn:0,
            byteColumn:0,
            sbyteColumn:-255,
        };

        let emitter = new _SqlInsertTableRowEmitter(Test.dialect, Test.table,row);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }


    @test
    async drop_table() {
        let emitter = new _SqlDropTableEmitter(Test.dialect, Test.table);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }
}