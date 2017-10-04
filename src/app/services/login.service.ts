import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IResponse, ILoginDetail, IAppConfig, ILoginUser } from '../models/viewModels';
import { responseStatus } from '../models/enums'
import { IWebRequest, ILoginService, ICommonService, IAppParams } from '../interfaces/interfaces';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoginService implements ILoginService {
		login: (userId: string, password: string) => Observable<IResponse<ILoginDetail>>;
		canExecute: (route: string) => Observable<boolean>;

		constructor( @Inject('IWebRequest') private webRequest: IWebRequest, @Inject('IAppParams') private config: IAppParams,
						@Inject('ICommonService') private commonService: ICommonService) {
				var vm = this;
				vm.login = (userId: string, password: string) => {
						var params: ILoginUser = { userName: userId, password: password };
						//return webRequest.post<ILoginDetail>(this.config.loginUrl, params);
                        let detail: ILoginDetail = {
                            id: 1,
                            userId: 1,
                            userName: 'cgupta',
                            accessToken: 'askjdbalsdb:asdasdasd',
                            expires: new Date(),
                            loggedinDate: new Date(),
                            isLoggedIn: true
                        };
                        let reponse: IResponse<ILoginDetail> = {
                            apiUrl: this.config.getParams().loginUrl,
                            data: detail,
                            messageKey: '',
                            status : responseStatus.Success
                        };
                        return Observable.of(reponse);
				};
				vm.canExecute = (route: string) => {
						//return webRequest.get<ILoginDetail>(this.config.authUrl, {route: route});
                    //return Observable.create(true);
                  //  return Observable.create(() => { return true });
                    let flag: boolean = true; // get from api
                    return Observable.of(flag);
				};
		}
}
