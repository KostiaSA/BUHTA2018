

import {ISchemaObjectProps} from "../ISchemaObject";

export interface ISchemaUserRoleProps extends ISchemaObjectProps {
    accessRolesIds:string[];
    mainMenuIds: string[];
}

