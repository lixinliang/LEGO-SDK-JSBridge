/**
 * @file     : UI.AlertView
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type AlertViewType = {
    title: string,
    message?: string,
    buttonTitles?: string[],
}

/**
 * AlertView
 * @param  {AlertViewType}
 * @return {Promise<any>}
 * @type   AlertViewType
 * @param  title: string
 * @param  message?: string
 * @param  buttonTitles?: string[]
 */
function AlertView (args: AlertViewType): Promise<any> {
    const {
        title = '',
        message = '',
        buttonTitles = [],
    } = args;
	return new Base().call('UI.AlertView', {
        title,
        message,
        buttonTitles,
    });
}

window.SDK.UI.AlertView = AlertView;

export default AlertView;
