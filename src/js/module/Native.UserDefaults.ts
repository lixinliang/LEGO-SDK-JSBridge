/**
 * @file     : Native.UserDefaults
 * @export   : umd
 */

import Base from './base';
import './namespace.native';

declare var window:any;

const { Promise } = window;

type UserDefaultsType = {
    opt: 'create' | 'update' | 'read' | 'delete',
    suite?: string,
    key: string,
    value?: string,
}

/**
 * UserDefaults
 * @param  {UserDefaultsType}
 * @return {Promise<any>}
 * @type UserDefaultsType
 * @param opt: 'create' | 'update' | 'read' | 'delete'
 * @param suite?: string
 * @param key: string
 * @param value?: string
 */
function UserDefaults (args: UserDefaultsType): Promise<any> {
    const {
        opt = '',
        suite = '',
        key = '',
        value = '',
    } = args;
	return new Base().call('Native.UserDefaults', {
        opt,
        suite,
        key,
        value,
    });
}

window.SDK.Native.UserDefaults = UserDefaults;

export default UserDefaults;
