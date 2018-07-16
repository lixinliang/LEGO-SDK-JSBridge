/**
 * @file     : Native.OpenURL
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

type OpenURLType = {
    URL: string,
}

/**
 * OpenURL
 * @param  {OpenURLType}
 * @return {Promise<any>}
 * @type   OpenURLType
 * @param  URL: string
 */
function OpenURL (args: OpenURLType): Promise<any> {
    const {
        URL = '',
    } = args;
	return new Base().call('Native.OpenURL', {
        URL,
    });
}

window.SDK.Native.OpenURL = OpenURL;

export default OpenURL;
