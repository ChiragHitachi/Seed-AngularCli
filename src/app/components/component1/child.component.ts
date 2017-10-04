import { Component, Inject, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
		selector: 'sp3-comp-child',
		templateUrl: './child.component.html'
})

export class ChildComponent {
		@Input() title: string;
		@Output() reply: EventEmitter<string> = new EventEmitter<string>();

		constructor() {
					
		}

		public ngOnChanges(changes: SimpleChanges): void {
				if (changes['title']) {

						console.log(changes['title']['currentValue']);

						if (changes['title']['currentValue'] === 'What is the plan for today') {
								this.reply.emit('Nothing much');
						}
						else if (changes['title']['currentValue'] === 'How Are you') {
								this.reply.emit('Fine. thanks');
						}
				}
		}

}
