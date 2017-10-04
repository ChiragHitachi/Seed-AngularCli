import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Inject } from '@angular/core';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { IResponse, ILoginDetail, IAppConfig } from '../../models/viewModels';
import { IWebRequest, ILoginService, ICommonService, ITranslateService} from '../../interfaces/interfaces';
import { responseStatus, messageType } from '../../models/enums';
import { Observable } from 'rxjs/Observable';
import { Routes, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslatePipe } from '../../pipes/translatePipe';

@Component({
		selector: 'sp3-comp-login',
		templateUrl: './login.component.html'
})

export class LoginComponent {
		userName: string;
		password: string;
		loginDetail: ILoginDetail;
		login: () => void;
		constructor( @Inject('ILoginService') private loginService: ILoginService, @Inject('ICommonService') private commonService: ICommonService,
				private router: Router) {
				var vm = this;
				vm.login = () => {
						if (!vm.userName || vm.userName.length === 0) {
						}
						else if (!vm.password || vm.password.length === 0) {
						}
						else {

								this.loginService.login(this.userName, this.password).subscribe(result => {
										if (result.status === responseStatus.Success) {
												this.loginDetail = result.data;
												this.loginDetail.loggedinDate = new Date();
												this.loginDetail.isLoggedIn = true;
												this.commonService.LoginDetail = this.loginDetail;
												this.router.navigateByUrl('/landing');
										}
										else {
										}
								},
										(error: IResponse<any>) => {
										
										}
								);
						}
				};
		}
}
