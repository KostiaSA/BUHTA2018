import {ISchemaPage} from "../app/platform-core/schema/ISchemaPage";
import {_saveSchemaObjectApiResponse} from "../app/platform-core/schema/api/_saveSchemaObjectApiResponse";
import {_sequelizeInit} from "../app/platform-core/server/_sequelize";
import {ISchemaApp} from "../app/platform-core/schema/ISchemaApp";

export async function createTestSchemaObjects() {
    await _sequelizeInit();

    let startPage: ISchemaPage = {
        id: "2A2B0CFFC047",
        type: "SchemaPage",
        name: "стартовая страница",
        description: "",
        template: "platform-core/templates/MainPageTemplate"
    }

    let result = await _saveSchemaObjectApiResponse({object: startPage});
    console.log(result.error || "создана '" + startPage.name + "'");

    let app: ISchemaApp = {
        id: "4FD8AF410DDE",
        type: "SchemaApp",
        name: "тестовое приложение",
        description: "",
        startPage: startPage.id
    }

    result = await _saveSchemaObjectApiResponse({object: app});
    console.log(result.error || "создана '" + app.name + "'");

}

createTestSchemaObjects().then(() => {
    process.exit(0);
});