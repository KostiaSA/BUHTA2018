// import * as SequelizeStatic from "sequelize";
// import {Options, Sequelize} from "sequelize";
// import {_config} from "../../config/buhta3-import/_config";
//
// export let _buhta3Sequelize: Sequelize;
//
// export async function _buhta3SequelizeInit() {
//     let options: Options = {
//         host: _config.sqlServerAddress,
//         dialect: _config.sqlDialect,
//         pool: {
//             max: 25,
//             min: 0,
//             idle: 10000
//         },
//         logging:false
//     };
//
//     _buhta3Sequelize = new SequelizeStatic(_config.sqlDatabase, _config.sqlLogin, _config.sqlPassword, options);
//
//     await _buhta3Sequelize.authenticate();
//     //await _initSchemaObjectModel();
// }
//
