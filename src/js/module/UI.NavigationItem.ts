/**
 * @file     : UI.NavigationItem
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type NavigationItemType = {
    title?: string,
    leftItem?: string,
    rightItem?: string,
    backItem?: string,
    callback?: Function,
}

/**
 * NavigationItem
 * @param  {NavigationItemType}
 * @type   NavigationItemType
 * @param  title?: string
 * @param  leftItem?: string
 * @param  rightItem?: string
 * @param  backItem?: string
 * @param  callback?: Function
 */
function NavigationItem (args: NavigationItemType): void {
    const {
        title = '',
        leftItem = '',
        rightItem = '',
        backItem = '',
        callback = () => {},
    } = args;
	new Base().call('UI.NavigationItem', {
        title,
        leftItem,
        rightItem,
        backItem,
    }, callback);
}

window.SDK.UI.NavigationItem = NavigationItem;

export default NavigationItem;
