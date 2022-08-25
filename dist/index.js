"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = exports.ApiClientMethod = void 0;
const react_1 = __importDefault(require("react"));
var ApiClientMethod;
(function (ApiClientMethod) {
    ApiClientMethod["GET"] = "get";
    ApiClientMethod["POST"] = "post";
    ApiClientMethod["PUT"] = "put";
    ApiClientMethod["PATCH"] = "patch";
    ApiClientMethod["DELETE"] = "delete";
})(ApiClientMethod = exports.ApiClientMethod || (exports.ApiClientMethod = {}));
const useApi = ({ axiosInstance, method, url, headers, onSuccess, onFail, defaultLoading = false }) => {
    const [controller, setController] = react_1.default.useState(null);
    const [returnData, setReturnData] = react_1.default.useState(null);
    const [error, setError] = react_1.default.useState(null);
    const [loading, setLoading] = react_1.default.useState(defaultLoading);
    const fetch = react_1.default.useCallback(({ data, urlAddition }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const response = yield axiosInstance.request({
                method: method,
                headers: headers,
                url: urlAddition ? url + urlAddition : url,
                data: data,
                signal: ctrl.signal
            });
            setReturnData(response.data);
            onSuccess && onSuccess(response.data);
        }
        catch (error) {
            const err = error;
            setError(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data));
            onFail && onFail((_b = err.response) === null || _b === void 0 ? void 0 : _b.data);
            throw (error);
        }
        finally {
            setLoading(false);
        }
        // eslint-disable-next-line
    }), [method, url]);
    react_1.default.useEffect(() => {
        return () => {
            controller && controller.abort();
        };
    }, [controller]);
    return [
        fetch,
        {
            data: returnData,
            setData: setReturnData,
            error: error,
            loading: loading,
        }
    ];
};
exports.useApi = useApi;
