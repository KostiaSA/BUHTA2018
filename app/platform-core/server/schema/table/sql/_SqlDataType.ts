import {ISqlDataTypeProps} from "../../../../schema/table/ISqlDataTypeProps";
import {serverState} from "../../../ServerState";
import {DataTypeAbstract} from "sequelize";

export class _SqlDataType<P extends ISqlDataTypeProps> {
    props: P;

    async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
        throw "abstract error"
    }

}

export function _createSqlDataTypeObject(props: ISqlDataTypeProps): _SqlDataType<ISqlDataTypeProps> {
    let objectClass = serverState.getRegisteredClassInfo(props.className).constructor;
    let obj = new objectClass();
    obj.props = props;
    return obj;
}