import { Injectable, Inject, Injector, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IKeyData } from '../models/viewModels';
import { IBroadcastService } from '../interfaces/interfaces';

@Injectable()
export class BroadcastService implements IBroadcastService {
		broadcast: (key: string, data: any) => void;

		public DataChange: EventEmitter<any>;
		constructor() {
				var vm = this;
				vm.DataChange = new EventEmitter();

				vm.broadcast = (key: string, data: any) => {
						var keydata: IKeyData = { key: key, data: data };
						vm.DataChange.emit(keydata);
				};
		}
}
