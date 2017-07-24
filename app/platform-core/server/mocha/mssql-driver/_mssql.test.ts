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
import {_SqlSelectTableRowEmitter} from "../../sql-emitter/_SqlSelectTableRowEmitter";
import {_SqlUpdateTableRowEmitter} from "../../sql-emitter/_SqlUpdateTableRowEmitter";

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
                name: "intColumn",
                dataType: "int"
            },
            {
                name: "uintColumn",
                dataType: "uint"
            },
            {
                name: "longColumn",
                dataType: "long"
            },
            {
                name: "ulongColumn",
                dataType: "ulong"
            },
            {
                name: "stringColumn",
                dataType: "string",
                dataLen: 4000,
            },
            {
                name: "textColumn",
                dataType: "text"
            },
            {
                name: "dateTimeColumn",
                dataType: "datetime"
            },
            {
                name: "dateColumn",
                dataType: "date"
            },
            // {
            //     name: "floatColumn",
            //     dataType: "float"
            // },
            {
                name: "doubleColumn",
                dataType: "double"
            },
            {
                name: "decimalColumn",
                dataType: "decimal",
                dataLen: 15,
                decimals: 2
            },

        ]
    }


    static test_row = {
        pkColumn: 0,
        byteColumn: 255,
        sbyteColumn: -127,
        shortColumn: -32768,
        ushortColumn: 32767,
        intColumn: -2147483648,
        uintColumn: 2147483647 * 2,
        longColumn: Number.MIN_SAFE_INTEGER,
        ulongColumn: Number.MAX_SAFE_INTEGER,
        stringColumn: getTestString().substr(0, 4000),
        textColumn: getLongTestString(2),
        dateTimeColumn: new Date(),
        dateColumn: new Date(1968, 12, 12),
        //floatColumn: 3.40282e38,
        doubleColumn: 1.797693134862315e+308, // Number.MAX_VALUE postgres не тянет, пришлось убрать одну цифру;
        decimalColumn: -9007199254740.99

    };

    static test_update_row = {
        pkColumn: 0,
        shortColumn: 32767,
        stringColumn: getTestString().substr(0, 1000),
    };


    @test
    async connection() {
        await Test.driver.connect();
        assert.equal("1", "1");
    }

    @test
    async execute_101_202() {
        let result = await
            Test.driver.executeSqlBatch(["SELECT '101' as p101", "SELECT '202' as p202"]);
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
        let emitter = new _SqlInsertTableRowEmitter(Test.dialect, Test.table, Test.test_row);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }

    @test
    async select() {

        let emitter = new _SqlSelectTableRowEmitter(Test.dialect, Test.table, 0);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
        let row = result[0][0];
        assert.deepEqual(row, Test.test_row);
    }

    @test
    async update() {
        let emitter = new _SqlUpdateTableRowEmitter(Test.dialect, Test.table, Test.test_update_row);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);

        let emitter2 = new _SqlSelectTableRowEmitter(Test.dialect, Test.table, 0,["pkColumn","shortColumn","stringColumn"]);
        let result2 = await Test.driver.executeSqlBatch([emitter2.toSql()]);
        let row = result2[0][0];
        assert.deepEqual(row, Test.test_update_row);


    }

    @test
    async drop_table() {
        let emitter = new _SqlDropTableEmitter(Test.dialect, Test.table);
        let result = await Test.driver.executeSqlBatch([emitter.toSql()]);
    }
}

function getTestString() {
    let ret: string[] = [];
    for (let i = 1; i <= 20000; i++)
        ret.push(String.fromCharCode(i));
    return ret.join("");
}

function getLongTestString(mb: number) { // в мегабайтах
    let ret: string[] = [];
    for (let j = 1; j <= 1024 * mb; j++)
        for (let i = 200; i <= 1024 + 200; i++)
            ret.push(String.fromCharCode(i));
    return ret.join("");

}
