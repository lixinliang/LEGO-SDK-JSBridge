/**
 * @file     : UI.PageState
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type PageStateType = {
    callback: Function,
}

/**
 * PageState
 * @param  {PageStateType}
 * @type   PageStateType
 * @param  callback: Function
 */
function PageState (args: PageStateType): void {
    const {
        callback = () => {},
    } = args;
	new Base().call('UI.PageState', {}, callback);
}

window.SDK.UI.PageState = PageState;

export default PageState;
