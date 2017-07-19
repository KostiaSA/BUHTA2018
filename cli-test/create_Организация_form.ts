import {_sequelizeInit} from "../app/platform-core/server/_sequelize";
import {ISchemaFormProps} from "../app/platform-core/schema/form/ISchemaFormProps";
import {SchemaForm} from "../app/platform-core/schema/form/SchemaForm";
import {_SchemaForm} from "../app/platform-core/server/schema/form/_SchemaForm";

export async function create_Организация_form() {
    await _sequelizeInit();

    // ------------------ SchemaQuery организация ------------------
    let form1: ISchemaFormProps = {
        id: SchemaForm.classInfo.recordIdPrefix+":"+ "MGQ5OTM1MDRlN2Q4NmVl",
        key: "1",
        type:"root",
        fieldName:"",
        className: SchemaForm.classInfo.className,
        name: "Форма карточка организации",
        description: "Форма карточка организации desc",
        tableId: "schema-table:db93rN1PNn0kVfqMRtY3",
        children: [
            {
                key: "NTdjMjhjZDNhYmZlODRk",
                type:"field",
                fieldName: "Номер",
            },
            {
                key: "ODk5ZThlNmQ5OGM2ZGQ2",
                type:"field",
                fieldName: "Название",
                formInputOptions:{
                    label:"да, название"
                }
            },
            {
                key: "OTY4ZTIwZWJkOWEyM2Qy",
                type:"field",
                fieldName: "ИНН",
                formInputOptions:{
                    label:"инн"
                }
            },
        ]
    };

    await new _SchemaForm(form1).save();
///    result = await _saveSchemaObjectApiResponse({object: query1});
    console.log("создана форма '" + form1.name + "'");
}

create_Организация_form().then(() => {
    process.exit(0);
});