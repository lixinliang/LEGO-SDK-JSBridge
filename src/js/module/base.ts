/**
 * @doc : https://lego-sdk.github.io/docs/api/
 */

import './namespace.sdk';
import './namespace.debug';
import './base.polyfill';

declare var window:any;
declare var Promise:any;
declare var JSMessage:any;

class Base {

	constructor () {
		if (!window.JSMessage) {
			throw '[SDK ERROR] JSMessage is not defined';
		}
	}

	parser (moduleName: string, requestParams?: Object): any {
		try {
			const debug = window.SDK.debug;
			if (debug.size > 0) {
				debug.log = [JSON.stringify([moduleName, requestParams])].concat(debug.log).slice(0, debug.size);
			}
		} catch (e) {}
		return JSMessage.newMessage(moduleName, requestParams);
	}

	callSync (moduleName: string, requestParams?: Object): void {
		this.parser(moduleName, requestParams).call((meta) => {
			if (meta.error) console.error(`[SDK Error] ${ moduleName }`, meta);
		});
	}

	call (moduleName: string, requestParams?: Object, callback?: Function): Promise<any> {
		if (callback) {
			this.parser(moduleName, requestParams).call((meta, result) => {
				const err = Object.keys(meta).length ? meta : null;
				callback({ err, result });
			});
			return Promise.resolve();
		}
		return new Promise((resolve) => {
			this.parser(moduleName, requestParams).call((meta, result) => {
				const err = Object.keys(meta).length ? meta : null;
				resolve({ err, result });
			});
		});
	}

};

window.SDK.Base = Base;

export default  Base;
