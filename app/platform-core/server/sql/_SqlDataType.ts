import {ISqlDataTypeProps} from "../../schema/table/ISqlDataTypeProps";
import {serverState} from "../ServerState";
import {DataTypeAbstract} from "sequelize";

export class _SqlDataType<P extends ISqlDataTypeProps> {
    static className = "?";
    props: P;

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        throw "abstract error"
    }

}

export function _createSqlDataTypeObject(props: ISqlDataTypeProps): _SqlDataType<ISqlDataTypeProps> {
    let objectClass = serverState.getRegisteredSqlDataType(props.className);
    let obj = new (objectClass as any)();
    obj.props = props;
    return obj;
}