import { AxiosInstance, AxiosRequestHeaders } from "axios";
import React from "react";
export declare enum ApiClientMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete"
}
export declare const useApi: <Request_1, Response_1, ErrorResponse>({ axiosInstance, method, url, headers, onSuccess, onFail, defaultLoading }: {
    axiosInstance: AxiosInstance;
    method: ApiClientMethod;
    url: string;
    headers?: AxiosRequestHeaders;
    onSuccess?: (data: Response_1) => void;
    onFail?: (error: ErrorResponse) => void;
    defaultLoading?: boolean;
}) => [({ data, urlAddition }: {
    data?: Request_1;
    urlAddition?: string;
}) => Promise<void>, {
    data: Response_1;
    setData: React.Dispatch<React.SetStateAction<Response_1>>;
    error: ErrorResponse;
    loading: boolean;
}];
