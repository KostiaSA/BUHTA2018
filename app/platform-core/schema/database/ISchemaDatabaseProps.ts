

import {ISchemaObjectProps} from "../ISchemaObject";
import {SqlDialect} from "../table/datatypes/SqlDataType";

export interface ISchemaDatabaseProps extends ISchemaObjectProps {
    sqlDialect: SqlDialect;
    sqlServerAddress: string;
    sqlServerInstance: string;
    sqlServerPort: number;
    sqlDatabase: string;
    sqlLogin: string;
    sqlPassword: string;
}

