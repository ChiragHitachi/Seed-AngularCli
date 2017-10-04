import { Component, Inject } from '@angular/core';
import { IResponse } from '../../models/viewModels';
import { responseStatus } from '../../models/enums';

@Component({
		selector: 'sp3-comp-2',
		templateUrl: './component2.component.html'
})

export class Component2Component {
		title: string;

		constructor() {
				var vm = this;
		}

		ngOnInit() {

		}
}
