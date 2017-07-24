import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code


import {parse} from "ejson";

export interface _IFindSchemaObjectsApiRequest {
    where: any;
}

export interface _IFindSchemaObjectsApiResponse {
    objects: ISchemaObjectProps[];
    error?: string;
}

export async function _findSchemaObjectsApiResponse(req: _IFindSchemaObjectsApiRequest): Promise<_IFindSchemaObjectsApiResponse> {
    throw  "не реализовано";
    // try {
    //     let instance = await schemaObjectModel.findAll({where:req.where});
    //     if (instance) {
    //         return Promise.resolve({objects: instance.map((item)=>parse(item.get().jsonData)) as any})
    //     }
    //     else
    //         return Promise.resolve({error: "internal error"} as any);
    // }
    // catch (e) {
    //     return Promise.resolve({error: "Ошибка _findSchemaObjectsApiResponse(): " + e.toString()} as any);
    // }
}