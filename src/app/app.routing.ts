import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { Component2Component } from './components/component2/component2.component';
import { Component1Component } from './components/component1/component1.component';
import { SecurityGuard } from './config/SecurityGuard';


export const routes: Routes = [
		{
				path: '',
				redirectTo: '/login',
				pathMatch: 'full'
		},
		{
				path: 'login',
				component: LoginComponent
		},
		{
				path: 'landing',
				component: LandingComponent
		}
		,
		{
				path: 'component2',
				component: Component2Component,
				canActivate: [SecurityGuard],
		},
		{
				path: 'component1',
				loadChildren: '../app/lazy/component1.module#component1AppModule'
		}  
];

export const AppRoutingProviders: any[] = [
];

