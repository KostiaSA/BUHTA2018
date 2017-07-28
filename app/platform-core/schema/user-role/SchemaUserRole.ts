import {ISchemaObjectClassInfo, SchemaObject} from "../SchemaObject";
import {ISchemaUserRoleProps} from "./ISchemaUserRoleProps";


export interface ISchemaUserRoleClassInfo extends ISchemaObjectClassInfo<typeof SchemaUserRole> {

}

export class SchemaUserRole extends SchemaObject<ISchemaUserRoleProps> {

    static classInfo: ISchemaUserRoleClassInfo = {
        title: "Роль пользователя",
        description: "Роль пользователя",
        className: "platform-core:SchemaUserRole",
        constructor: SchemaUserRole,
        recordIdPrefix: "schema-UserRole"
    };

}