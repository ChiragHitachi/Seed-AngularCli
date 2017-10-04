import { Injectable, Inject, EventEmitter } from '@angular/core';
import { TRANSLATIONS } from '../config/translations'; // import our opaque token
import { ITranslateService } from '../interfaces/interfaces';

@Injectable()
export class TranslateService implements ITranslateService {
		private currentLang: string;
		private PLACEHOLDER = '%';
		private defaultLang: string;
		private fallback: boolean;

		public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

		public get CurrentLang() {
				return this.currentLang || this.defaultLang;
		}

		public setDefaultLang(lang: string) {
				this.defaultLang = lang;
		}

		public enableFallback(enable: boolean) {
				this.fallback = enable;
		}

		// inject our translations
		constructor( @Inject(TRANSLATIONS) private _translations: any) {
		}

		public use(lang: string): void {
				this.currentLang = lang;
				this.onLangChanged.emit(lang);
		}

		private translate(key: string): string {
				let translation = key;

				// found in current language
				if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
						return this._translations[this.currentLang][key];
				}

				// fallback disabled
				if (!this.fallback) {
						return translation;
				}

				// found in default language
				if (this._translations[this.defaultLang] && this._translations[this.defaultLang][key]) {
						return this._translations[this.defaultLang][key];
				}

				// not found
				return translation;
		}

		public replace(word: string = '', words: string | string[] = '') {
				let translation: string = word;

				const values: string[] = [].concat(words);
				values.forEach((e, i) => {
						translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
				});

				return translation;
		}

		public instant(key: string, words?: string | string[]) {
				// public perform translation
				const translation: string = this.translate(key);

				if (!words) return translation;
				return this.replace(translation, words);
		}
}
