# use-api

## Installation
* Using yarn
```sh
yarn add @fourkord/use-api
```
* Using npm
```sh
npm i @fourkord/use-api
```

## Usage
* Basic usage
```ts
  const instance = axios.create({
    baseURL: "http://localhost:4000"
  });
```
```ts
  const [fetch, {data, setData, loading, error}] = useApi({
    axiosInstance: instance,
    method: ApiClientMethod.GET,
    url: "/endpoint",
    onSuccess: (data) => {
      console.log(data);
    },
    onFail: (error) => {
      console.log(error);
    },
    defaultLoading: false  // optional, If true, setLoading is true by default, not when api call made. defaultLoading = false by default.
  });
```
* Types declaration
```ts
  interface IRequest {
    field1: string
  }
  interface IResponse {
    field1: string
  }
  interface IErrorResponse {
    field1: string
  }
```
```ts
  const [fetch] = useApi<IRequest, IResponse, IErrorResponse>({
    axiosInstance: instance,
    method: ApiClientMethod.GET,
    url: "/endpoint",
    onSuccess: (data) => { // optional
      console.log(data);
    },
    onFail: (error) => {   // optional
      console.log(error);
    }
  });
```
* Fetch arguments
```ts
  useEffect(async () => {
    await fetch({
      data: {"field1": "value1"}, //                                 optional
      urlAddition: "1"            // /endpoint + /1 => /endpoint/1,  optional
    });
   }, [fetch]);
```
