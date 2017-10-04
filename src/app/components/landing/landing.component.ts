import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IResponse} from '../../models/viewModels';
import { ICommonService, IBroadcastService, } from '../../interfaces/interfaces';
import { responseStatus, messageType } from '../../models/enums';
import { Routes, Router } from '@angular/router';

@Component({
		selector: 'sp3-comp-landing',
		templateUrl: './landing.component.html'
})

export class LandingComponent implements OnInit, OnDestroy{
		title: string;
		message: string;
		showError: boolean;
		welcomeMessage: string;
		customerLogo: string;
		ngOnDestroy() {
				var vm = this;
		}
		constructor( 
						@Inject('ICommonService') private commonService: ICommonService, 
						@Inject('IBroadcastService') private broadcastService: IBroadcastService,
						private router: Router) {
				var vm = this;
			
 
		}

		ngOnInit() {
				
		}

}
