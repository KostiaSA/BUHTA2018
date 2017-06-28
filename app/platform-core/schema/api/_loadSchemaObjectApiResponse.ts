import {ISchemaObject} from "../ISchemaObject";  // emit-to-request-code

export interface _ILoadSchemaObjectApiRequest {
    id: string
}

export interface _ILoadSchemaObjectApiResponse {
    object: ISchemaObject;
    error?: string;
}

export function _loadSchemaObjectApiResponse(req: _ILoadSchemaObjectApiRequest): Promise<_ILoadSchemaObjectApiResponse> {
    return Promise.resolve({object:{}})
}