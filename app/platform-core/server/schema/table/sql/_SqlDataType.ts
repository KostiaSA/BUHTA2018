
import {ISqlDataTypeProps} from "../../../../schema/table/datatypes/ISqlDataTypeProps";
import {serverState} from "../../../ServerState";
import {_ISqlTableColumn} from "../../database/_SqlTable";
import {ISchemaTableColumnProps} from "../../../../schema/table/ISchemaTableColumnProps";

export class _SqlDataType<P extends ISqlDataTypeProps> {
    props: P;


    async getSqlTableColumns(colProps: ISchemaTableColumnProps): Promise<_ISqlTableColumn[]> {
        throw "abstract error"
    }

    // async getSequelizeDataType(): Promise<string | DataTypeAbstract> {
    //     throw "abstract error"
    // }

}


export function _createSqlDataTypeObject(props: ISqlDataTypeProps): _SqlDataType<ISqlDataTypeProps> {
    let objectClass = serverState.getRegisteredClassInfo(props.className).constructor;
    let obj = new objectClass();
    obj.props = props;
    return obj;
}