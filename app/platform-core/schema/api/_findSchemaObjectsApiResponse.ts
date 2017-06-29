import {ISchemaObject} from "../ISchemaObject"; // emit-to-request-code
import {WhereOptions} from "sequelize";  // emit-to-request-code

import {schemaObjectModel} from "../_schemaObjectModel";

export interface _IFindSchemaObjectsApiRequest {
    where: WhereOptions;
}

export interface _IFindSchemaObjectsApiResponse {
    objects: ISchemaObject[];
    error?: string;
}

export async function _findSchemaObjectsApiResponse(req: _IFindSchemaObjectsApiRequest): Promise<_IFindSchemaObjectsApiResponse> {
    try {
        let instance = await schemaObjectModel.findAll({where:req.where});
        if (instance) {
            return Promise.resolve({objects: instance.map((item)=>JSON.parse(item.get().jsonData)) as any})
        }
        else
            return Promise.resolve({error: "internal error"} as any);
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _findSchemaObjectsApiResponse(): " + e.toString()} as any);
    }
}