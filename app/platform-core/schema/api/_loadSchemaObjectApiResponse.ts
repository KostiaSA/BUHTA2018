import {ISchemaObject} from "../ISchemaObject"; // emit-to-request-code

import {schemaObjectModel} from "../_schemaObjectModel";

export interface _ILoadSchemaObjectApiRequest {
    id: string
}

export interface _ILoadSchemaObjectApiResponse {
    object: ISchemaObject;
    error?: string;
}

export async function _loadSchemaObjectApiResponse(req: _ILoadSchemaObjectApiRequest): Promise<_ILoadSchemaObjectApiResponse> {
    try {
        let instance = await schemaObjectModel.findByPrimary(req.id);
        if (instance) {
            let row = instance.get();
            return Promise.resolve({object: JSON.parse(row.jsonData) as any})
        }
        else
            return Promise.resolve({error: "Ошибка загрузки SchemaObject ([" + req.id + "]): запись не найдена"} as any);
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка загрузки SchemaObject ([" + req.id + "]): " + e.toString()} as any);
    }
}