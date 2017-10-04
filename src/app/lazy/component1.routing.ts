import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Component1Component } from '../components/component1/component1.component';


export const routes: Routes = [
		{
				path: '',
				component: Component1Component
		}
];

//export const Component1AppRouting: ModuleWithProviders = ;
