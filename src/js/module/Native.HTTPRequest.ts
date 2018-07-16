/**
 * @file     : Native.HTTPRequest
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

type HTTPRequestType = {
    URL: string,
    data?: string,
    timeout?: number,
    headers?: Object,
    showActivityIndicator?: boolean,
}

/**
 * HTTPRequest
 * @param  {HTTPRequestType}
 * @return {Promise<any>}
 * @type   HTTPRequestType
 * @param  URL: string
 * @param  data?: string
 * @param  timeout?: number
 * @param  headers?: Object
 * @param  showActivityIndicator?: boolean
 */
function HTTPRequest (args: HTTPRequestType): Promise<any> {
    const {
        URL = '',
        data = '',
        timeout = 0,
        headers = {},
        showActivityIndicator = true,
    } = args;
	return new Base().call('Native.HTTPRequest', {
        URL,
        data,
        timeout,
        headers,
        showActivityIndicator,
    });
}

window.SDK.Native.HTTPRequest = HTTPRequest;

export default HTTPRequest;
