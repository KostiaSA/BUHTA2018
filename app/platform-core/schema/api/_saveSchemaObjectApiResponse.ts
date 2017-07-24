import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code


import {stringify} from "ejson";

export interface _ISaveSchemaObjectApiRequest {
    object: ISchemaObjectProps;
}

export interface _ISaveSchemaObjectApiResponse {
    error?: string;
}

export async function _saveSchemaObjectApiResponse(req: _ISaveSchemaObjectApiRequest): Promise<_ISaveSchemaObjectApiResponse> {
    throw "не реализо"
    // let row = {
    //     id: req.object.id,
    //     name: req.object.name,
    //     className: req.object.className,
    //     description: req.object.description,
    //     jsonData: stringify(req.object)
    // };
    // try {
    //     await schemaObjectModel.upsert(row);
    //     return Promise.resolve({})
    // }
    // catch (e) {
    //     return Promise.resolve({error: "Ошибка сохранения SchemaObject ([" + row.id + "] " + row.name + "): " + e.toString()});
    // }


}