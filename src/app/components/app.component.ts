import { Component, Inject, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ICommonService, ITranslateService } from '../interfaces/interfaces';
import { ILoginDetail } from '../models/viewModels';

@Component({
		selector: 'sp3-comp-app', 
		templateUrl: './app.component.html',
})

export class AppComponent {
		title = 'SP3';
		
		
		pageKey: string = 'Role';
		

		get LoginDetail(): ILoginDetail {   
				if (window.location.pathname.indexOf('login') > 0)
						this.commonService.LoginDetail.isLoggedIn = false;
				return this.commonService.LoginDetail;
		}

		logout: () => void;
		constructor( @Inject('ICommonService') private commonService: ICommonService, private router: Router,
				@Inject('ITranslateService') private translateService: ITranslateService) {
				var vm = this;
				vm.translateService.setDefaultLang('en');
				vm.translateService.enableFallback(true);
				if (!vm.LoginDetail || !vm.LoginDetail.isLoggedIn || vm.LoginDetail.accessToken.trim() === '') {
						vm.router.navigateByUrl('/login');
				}
				else {
						vm.router.navigateByUrl('/login');
						vm.router.navigateByUrl(window.location.pathname  === '/' ? '/login' : window.location.pathname);
				}

			

				vm.logout = () => {
						vm.commonService.LoginDetail.isLoggedIn = false;
						if (localStorage.getItem('loginDetail'))
								localStorage.removeItem('loginDetail');

						vm.router.navigateByUrl('/login');

				};

					
		}   
}
