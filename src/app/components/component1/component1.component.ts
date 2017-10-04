import { Component, Inject } from '@angular/core';

@Component({
		selector: 'sp3-comp-1',
		templateUrl: './component1.component.html'
})

export class Component1Component {
		public title: string;
		public message: string;
		constructor() {
				this.title = 'How Are you';
		}
		public handleClick() {
				this.title = 'What is the plan for today';
		}
		public handleReply(value: string) {
				console.log(value);
				this.message = value;
		}

}
