import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code
import {WhereOptions} from "sequelize";  // emit-to-request-code

import {schemaObjectModel} from "../_schemaObjectModel";

export interface _IFindSchemaObjectsForLookupApiRequest {
    where: WhereOptions;
}

export interface _IFindSchemaObjectsForLookupApiResponse {
    objects: ISchemaObjectProps[];
    error?: string;
}

export async function _findSchemaObjectsForLookupApiResponse(req: _IFindSchemaObjectsForLookupApiRequest): Promise<_IFindSchemaObjectsForLookupApiResponse> {
    try {
        let instance = await schemaObjectModel.findAll({attributes: ["id", "name"], where: req.where});
        if (instance) {
            return Promise.resolve({objects: instance.map((item) => item.get()) as any})
        }
        else
            return Promise.resolve({error: "internal error"} as any);
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка _findSchemaObjectsForLookupApiResponse(): " + e.toString()} as any);
    }
}