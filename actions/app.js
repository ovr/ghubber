// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showHome } from './navigation';

export function login(username: string, password: string) {
    return dispatch => {
        dispatch(showHome());
    }
}
