export interface _ISuperPingApiRequest {
    super_login: string; // это логин
}

export interface _ISuperPingApiResponse {
    str: string;
    error?: string;
}

export function _superPingApiResponse(req: _ISuperPingApiRequest): Promise<_ISuperPingApiResponse> {
    return Promise.resolve({str: "super ok:" + req.super_login})
}