import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
		IResponse, ILoginDetail, IAppConfig
 } from '../models/viewModels';
import { sortOrder } from '../models/enums';
import { Subject } from 'rxjs/Subject';

export interface IAppParams {
  getParams: () => IAppConfig;
}

export interface IWebRequest {
		get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
		post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
		put: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
		patch: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
}

export interface ICommonService {
		LoginDetail: ILoginDetail;
		getRequestHeader: () => any;
		getAuthToken: () => any;
}

export interface ILoginService {
		login: (userName: string, password: string) => Observable<IResponse<ILoginDetail>>;
		canExecute: (route: string) => Observable<boolean>;
}

 
export interface ITranslateService {
		CurrentLang: string;
		setDefaultLang: (lang: string) => void;
		enableFallback: (enable: boolean) => void;
		use: (lang: string) => void;
		replace: (word: string, words: string | string[]) => string;
		instant: (key: string, words?: string | string[]) => string;
}
	

export interface IStorageService {
		setItem: (key: string, value: any) => void;
		getItem: (key: string) => any;
		clearItem: (key: string) => void;
		clearStorage: () => void;
}


export interface IBroadcastService {
		broadcast: (key: string, data: any) => void;
		DataChange: EventEmitter<any>;
}


export interface IDateFormatService {
		formatDate: (date: Date, format?: string) => string;
}

export interface ITimeFormatService {
		formatTime: (time: string, format?: string) => string;
}
