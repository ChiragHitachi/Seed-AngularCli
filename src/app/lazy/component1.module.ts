import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Component1Component } from '../components/component1/component1.component';
import { ChildComponent } from '../components/component1/child.component';

import { routes } from './Component1.routing';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
		// directives, components, and pipes
		declarations: [
				Component1Component,
				ChildComponent,
		],
		// modules
		imports: [

				RouterModule.forChild(routes),
				CommonModule,
				//ChartModule,
				//ChartModule.forRoot(require('highcharts'))  // <-- HERE
		],
		//providers: [{
		//    provide: HighchartsStatic,
		//    useFactory: highchartsFactory
		//}],

})
export class component1AppModule { }


