/**
 * @file     : UI.ImagePreviewer
 * @export   : umd
 */

import Base from './base';
import './namespace.ui';

declare var window:any;

const { Promise } = window;

type ImagePreviewerType = {
    URLs: string[],
    currentURL?: string,
}

/**
 * ImagePreviewer
 * @param  {ImagePreviewerType}
 * @type   ImagePreviewerType
 * @param  URLs: string[]
 * @param  currentURL?: string
 */
function ImagePreviewer (args: ImagePreviewerType): void {
    const {
        URLs = [],
        currentURL = '',
    } = args;
	return new Base().callSync('UI.ImagePreviewer', {
        URLs,
        currentURL,
    });
}

window.SDK.UI.ImagePreviewer = ImagePreviewer;

export default ImagePreviewer;
