import {ISchemaObjectProps} from "../ISchemaObject"; // emit-to-request-code

import {schemaObjectModel} from "../_schemaObjectModel";

export interface _ISaveSchemaObjectApiRequest {
    object: ISchemaObjectProps;
}

export interface _ISaveSchemaObjectApiResponse {
    error?: string;
}

export async function _saveSchemaObjectApiResponse(req: _ISaveSchemaObjectApiRequest): Promise<_ISaveSchemaObjectApiResponse> {

    let row = {
        id: req.object.id,
        name: req.object.name,
        className: req.object.className,
        type: req.object.type,
        description: req.object.description,
        jsonData: JSON.stringify(req.object)
    };
    try {
        await schemaObjectModel.upsert(row);
        return Promise.resolve({})
    }
    catch (e) {
        return Promise.resolve({error: "Ошибка сохранения SchemaObject ([" + row.id + "] " + row.name + "): " + e.toString()});
    }

    // return schemaObjectModel.upsert(row)
    //     .then(() => {
    //         console.log("жопа1");
    //         return {};
    //     })
    //     .catch((err: any) => {
    //         console.log("жопа2");
    //         return {error: "Ошибка сохранения SchemaObject ([" + row.id + "] " + row.name + "): " + err.toString()};
    //     });

}