import { Injectable } from '@angular/core';
import { IStorageService } from '../interfaces/interfaces';

@Injectable()
export class StorageService implements IStorageService {
		setItem: (key: string, value: any) => void;
		getItem: (key: string) => any;
		clearItem: (key: string) => void;
		clearStorage: () => void;

		constructor() {
				var vm = this;

				vm.setItem = (key: string, value: any) => {
						localStorage.setItem(key, JSON.stringify(value));
				};

				vm.getItem = (key: string) => {
						let item = localStorage.getItem(key);
						return item ? JSON.parse(item) : '';
				};

				vm.clearItem = (key: string) => {
						localStorage.removeItem(key);
				};

				/**
         * Clean-Up localStorage.  Can be done during log-out
         */
				vm.clearStorage = () => {
						localStorage.clear();
				};
		}
}
