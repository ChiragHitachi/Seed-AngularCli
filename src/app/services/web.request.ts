import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Request, RequestMethod, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IResponse, IAPIResponse } from '../models/viewModels';
import { responseStatus } from '../models/enums';
import { IWebRequest, ICommonService, IAppParams } from '../interfaces/interfaces';

@Injectable()
export class WebRequest implements IWebRequest {
    patch: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
    get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
    post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
    put: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
    getApiUrl: (url) => string;
    getAttachment: (url: string, mimeType: string) => any;
    constructor(private http: Http, 
        @Inject('ICommonService') private commonService: ICommonService, 
        @Inject('IAppParams') private config: IAppParams) {
        var vm = this;

        vm.get = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
            let options = vm.getRequestOption(RequestMethod.Get, vm.getApiUrl(url), data, header ? header : vm.commonService.getRequestHeader());

            return vm.http.request(new Request(options)).map(response => {
                var apiRespose: IAPIResponse<T> = response.json();
                var result = vm.handleAPIResponse<T>(apiRespose, url);
                return result;
            },
            ).catch((error: any) => {
                return vm.handleError<T>(error.status, url);
            });
        };

        vm.post = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
            let options = vm.getRequestOption(RequestMethod.Post, vm.getApiUrl(url), data, header ? header : vm.commonService.getRequestHeader());

            return vm.http.request(new Request(options)).map(response => {
                var apiRespose: IAPIResponse<T> = response.json();
                var result = vm.handleAPIResponse<T>(apiRespose, url);
                return result;
            },
            ).catch((error: any) => {
                return vm.handleError<T>(error.status, url);
            });
        };

        vm.put = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
            let options = vm.getRequestOption(RequestMethod.Put, vm.getApiUrl(url), data, header ? header : vm.commonService.getRequestHeader());

            return vm.http.request(new Request(options)).map(response => {
                var apiRespose: IAPIResponse<T> = response.json();
                var result = vm.handleAPIResponse<T>(apiRespose, url);
                return result;
            },
            ).catch((error: any) => {
                return vm.handleError<T>(error.status, url);
            });
        };

        vm.patch = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
            let options = vm.getRequestOption(RequestMethod.Patch, vm.getApiUrl(url), data, header ? header : vm.commonService.getRequestHeader());

            return vm.http.request(new Request(options)).map(response => {
                var apiRespose: IAPIResponse<T> = response.json();
                var result = vm.handleAPIResponse<T>(apiRespose, url);
                return result;
            },
            ).catch((error: any) => {
                return vm.handleError<T>(error.status, url);
            });
        };
        vm.getApiUrl = (url) => {
            if (this.config.getParams().isProduction) {
                if (document.location.origin.indexOf('localhost') > -1) {
                    url = 'http://10.101.1.4/' + url;
                }
                else {
                    url = document.location.origin + url;
                }
            }
            return url;
        };

        vm.getAttachment = (url, mimeType) => {
            var headerParams = {
                'Content-Type': 'application/json',
                'Accept': mimeType,
                'Authorization': vm.commonService.getAuthToken()
            };
            let headers = new Headers(headerParams);
            let options = new RequestOptions({ headers: headers });
            options.responseType = ResponseContentType.Blob;
            return vm.http.get(url, options);
        };
    }

    private getRequestOption(method: any, url: string, data?: any, header?: any) {
        let urlParams = new URLSearchParams();
        for (let key in data) {
            urlParams.set(key, data[key]);
        }
        if (method === RequestMethod.Get) {
            return new RequestOptions({ method: method, url: url, responseType: ResponseContentType.Json, search: urlParams, headers: header });
        }
        else {
            return new RequestOptions({ method: method, url: url, responseType: ResponseContentType.Json, headers: header, body: JSON.stringify(data) });
        }
    }
    private handleAPIResponse<T>(apiResponse: IAPIResponse<any>, url: string) {
        let result: IResponse<T> = {
            apiUrl: url,
            data: null,
            messageKey: '',
            status: responseStatus.Success
        };
        result.messageKey = apiResponse.code;
        if (apiResponse.code.slice(6, 9) === '000') {
            result.data = apiResponse.data;
        }
        else if (apiResponse.code.slice(6, 9) === '005') {
            result.status = responseStatus.Timeout;
        }
        else {
            result.status = responseStatus.APIError;
        }

        return result;
    }

    private handleError<T>(status: any, url: string) {
        let result: IResponse<T> = {
            apiUrl: url,
            data: null,
            messageKey: 'DefaultError',
            status: responseStatus.Failure
        };

        if (status === 500) {
            result.status = responseStatus.Failure;
        }
        else if (status === 401 || status === 403) {
            result.status = responseStatus.NotAuthorized;
            result.messageKey = 'NotAuthorized';
        }
        else if (status === 404 || status === 503) {
            result.status = responseStatus.ApiNotAvailable;
        }


        //log the error
        return Observable.throw(result);
    }
}
