/**
 * @file     : UI.Toast
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type ToastType = {
    opt: 'show' | 'hide',
    style?: 'loading' | 'success' | 'error',
    title?: string,
    timeout?: number,
}

/**
 * Toast
 * @param  {ToastType}
 * @type   ToastType
 * @param  opt: 'show' | 'hide'
 * @param  style?: 'loading' | 'success' | 'error'
 * @param  title?: string
 * @param  timeout?: number
 */
function Toast (args: ToastType): void {
    const {
        opt = '',
        style = '',
        title = '',
        timeout = 0,
    } = args;
	return new Base().callSync('UI.Toast', {
        opt,
        style,
        title,
        timeout,
    });
}

window.SDK.UI.Toast = Toast;

export default Toast;
