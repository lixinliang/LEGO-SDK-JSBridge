/**
 * @file     : Native.Check
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

/**
 * Check
 * @return {Promise<any>}
 */
function Check (): Promise<any> {
	return new Base().call('Native.Check');
}

window.SDK.Native.Check = Check;

export default Check;
