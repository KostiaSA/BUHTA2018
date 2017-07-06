import {_SchemaTable} from "../../../server/_SchemaTable";
import {schemaObjectModel} from "../../_schemaObjectModel";
import {parse} from "ejson";


export interface _ISyncSchemaTableApiRequest {
    schemaTableId: string;
}

export interface _ISyncSchemaTableApiResponse {
    error?: string;
}

export async function _syncSchemaTableApiResponse(req: _ISyncSchemaTableApiRequest): Promise<_ISyncSchemaTableApiResponse> {
    try {
        let instance = await schemaObjectModel.findByPrimary(req.schemaTableId);
        if (instance) {
            let table = new _SchemaTable();
            table.props = parse(instance.get().jsonData);
            console.log("sync ok",table);
            return Promise.resolve({})
        }
        else
            throw "SchemaTable не найден, id: " + req.schemaTableId;
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _syncSchemaTableApiResponse(): " + e.toString()} as any);
    }
}