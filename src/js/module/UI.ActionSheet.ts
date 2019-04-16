/**
 * @file     : UI.ActionSheet
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type ActionSheetType = {
    title?: string,
    buttonTitles: string[],
    dangerButton?: number,
    cancelButton?: string,
}

/**
 * ActionSheet
 * @param  {ActionSheetType}
 * @return {Promise<any>}
 * @type   ActionSheetType
 * @param  title?: string
 * @param  buttonTitles: string[]
 * @param  dangerButton?: number
 * @param  cancelButton?: string
 */
function ActionSheet (args: ActionSheetType): Promise<any> {
    const {
        title = '',
        buttonTitles = [],
        dangerButton = 0,
        cancelButton = '',
    } = args;
	return new Base().call('UI.ActionSheet', {
        title,
        buttonTitles,
        dangerButton,
        cancelButton,
    });
}

window.SDK.UI.ActionSheet = ActionSheet;

export default ActionSheet;
