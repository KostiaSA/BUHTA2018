export interface _IPingApiRequest {
    login: string; // это логин
}

export interface _IPingApiResponse {
    str: string;
    error?: string;
}

export function _pingApiResponse(req: _IPingApiRequest): Promise<_IPingApiResponse> {
    return Promise.resolve({str: "ok:" + req.login})
}