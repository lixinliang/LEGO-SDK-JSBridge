/**
 * @file     : Native.Device
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

/**
 * Device
 * @return {Promise<any>}
 */
function Device (): Promise<any> {
	return new Base().call('Native.Device');
}

window.SDK.Native.Device = Device;

export default Device;
