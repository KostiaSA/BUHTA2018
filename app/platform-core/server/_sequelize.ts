import * as SequelizeStatic from "sequelize";
import {Options, Sequelize} from "sequelize";
import {_config} from "../../../_config";
import {_initSchemaObjectModel} from "../schema/_schemaObjectModel";

export let _sequelize: Sequelize;

export async function _sequelizeInit() {
    if (_sequelize)
        return;

    let options: Options = {
        host: _config.sqlServerAddress,
        dialect: _config.sqlDialect,
        pool: {
            max: 25,
            min: 0,
            idle: 10000
        },
        logging:false
    };

    _sequelize = new SequelizeStatic(_config.sqlDatabase, _config.sqlLogin, _config.sqlPassword, options);

    await _sequelize.authenticate();
    await _initSchemaObjectModel();
}

