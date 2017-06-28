import {ISchemaPage} from "../app/platform-core/schema/ISchemaPage";
import {_saveSchemaObjectApiResponse} from "../app/platform-core/schema/api/_saveSchemaObjectApiResponse";
import {_sequelizeInit} from "../app/platform-core/server/_sequelize";

export async function createTestSchemaObjects() {
    await _sequelizeInit();

    let startPage: ISchemaPage = {
        id: "2A2B0CFFC047",
        type: "SchemaPage",
        name: "стартовая страница",
        description: "",
        template: ""
    }

    let result = await _saveSchemaObjectApiResponse({object: startPage});
    console.log(result.error || "создана '" + startPage.name+"'");


}

createTestSchemaObjects().then(()=>{
    process.exit(0);
});