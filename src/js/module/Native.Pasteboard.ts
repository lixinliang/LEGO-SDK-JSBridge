/**
 * @file     : Native.Pasteboard
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

type PasteboardType = {
    opt: 'read' | 'update' | 'delete',
    string?: string,
}

/**
 * Pasteboard
 * @param  {PasteboardType}
 * @return {Promise<any>}
 * @type   PasteboardType
 * @param  opt: 'read' | 'update' | 'delete'
 * @param  string?: string
 */
function Pasteboard (args: PasteboardType): Promise<any> {
    const {
        opt = '',
        string = '',
    } = args;
	return new Base().call('Native.Pasteboard', {
        opt,
        string,
    });
}

window.SDK.Native.Pasteboard = Pasteboard;

export default Pasteboard;
