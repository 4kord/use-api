import { ApiClientMethod, useApi } from "@fourkord/use-api"
import axios from "axios";

const instance = axios.create({
  baseURL: "https://catfact.ninja",
  headers: {"Content-Type": "application/json"}
})

const [fetch] = useApi<void, {fact: string, length: number}, void>({
  axiosInstance: instance,
  method: ApiClientMethod.GET,
  url: "/fact",
  onSuccess: (response) => {
    console.log(response);
  },
  onFail: (error) => {
    console.log(error);
  }
});

fetch({});
