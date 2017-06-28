import {ISchemaObject} from "../ISchemaObject";  // emit-to-request-code

export interface _ISaveSchemaObjectApiRequest {
    object: ISchemaObject;
}

export interface _ISaveSchemaObjectApiResponse {
    error?: string;
}

export function _saveSchemaObjectApiResponse(req: _ISaveSchemaObjectApiRequest): Promise<_ISaveSchemaObjectApiResponse> {
    return Promise.resolve({})
}