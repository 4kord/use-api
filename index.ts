import { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import React from "react";

export enum ApiClientMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export const useApi = <Request, Response, ErrorResponse>({axiosInstance, method, url, headers, onSuccess, onFail, defaultLoading = false}: {axiosInstance: AxiosInstance, method: ApiClientMethod, url: string, headers?: AxiosRequestHeaders, onSuccess?: (data: Response) => void, onFail?: (error: ErrorResponse) => void, defaultLoading?: boolean}): [({data, urlAddition}: { data?: Request, urlAddition?: string }) => Promise<void>, {data: Response, setData: React.Dispatch<React.SetStateAction<Response>>, error: ErrorResponse, loading: boolean}] => {
  const [controller, setController] = React.useState<AbortController | null>(null);
  const [returnData, setReturnData] = React.useState<Response | null>(null);
  const [error, setError] = React.useState<ErrorResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(defaultLoading);

  const fetch = React.useCallback(async ({data, urlAddition}: {data?: Request, urlAddition?: string}) => {
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const response = await axiosInstance.request({
        method: method,
        headers: headers,
        url: urlAddition ? (url[url.length - 1] === "/" ? url + urlAddition : url + "/" + urlAddition) : url,
        data: data,
        signal: ctrl.signal
      });

      setReturnData(response.data);
      onSuccess && onSuccess(response.data);
    } catch (error) {
      const err = error as AxiosError;
      setError((err.response?.data) as ErrorResponse);
      onFail && onFail(err.response?.data as ErrorResponse);
      throw(error)
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line
  }, [method, url])

  React.useEffect(() => {
    return () => {
      controller && controller.abort();
    }
  }, [controller]);

  return [
    fetch,
    {
      data: returnData!,
      setData: setReturnData as React.Dispatch<React.SetStateAction<Response>>,
      error: error!,
      loading: loading,
    }
  ]
}
