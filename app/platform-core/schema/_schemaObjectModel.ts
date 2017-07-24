//
// export let schemaObjectModel: Sequelize.Model<any, any>;
//
// export async function _initSchemaObjectModel() {
//     schemaObjectModel = _sequelize.define("__SchemaObject__", {
//         id: {
//             type: Sequelize.STRING(127),
//             unique: true,
//             primaryKey: true
//         },
//         name: {
//             type: Sequelize.STRING(127)
//         },
//         className: {
//             type: Sequelize.STRING(127)
//         },
//         description: {
//             type: Sequelize.STRING(1000)
//         },
//         jsonData: {
//             type: Sequelize.TEXT
//         }
//     }, {
//         freezeTableName: true,
//         createdAt: false,
//         updatedAt: false
//     });
//
//     await schemaObjectModel.sync({alter: true});
//
//     console.log("таблица SchemaObject Ok")
// }