import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code


import {parse} from "ejson";
import {_loadSchemaObject} from "../../server/schema/_loadSchemaObject";

export interface _ILoadSchemaObjectApiRequest {
    id: string
}

export interface _ILoadSchemaObjectApiResponse {
    object: ISchemaObjectProps;
    error?: string;
}

export async function _loadSchemaObjectApiResponse(req: _ILoadSchemaObjectApiRequest): Promise<_ILoadSchemaObjectApiResponse> {


    try {
        let obj= await _loadSchemaObject(req.id);
        return Promise.resolve({object: obj.props});

        // let instance = await schemaObjectModel.findByPrimary(req.id);
        // if (instance) {
        //     let row = instance.get();
        //     return Promise.resolve({object: parse(row.jsonData) as any})
        // }
        // else
        //     return Promise.resolve({error: "Ошибка загрузки SchemaObject ([" + req.id + "]): запись не найдена"} as any);
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка загрузки SchemaObject ([" + req.id + "]): " + e.toString()} as any);
    }
}