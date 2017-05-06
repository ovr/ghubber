// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showLogin } from 'actions';
import {
    APP_LOGOUT_SUCCESS
} from 'constants';

export function logout() {
    return dispatch => {
        dispatch({
            type: APP_LOGOUT_SUCCESS
        });

        dispatch(showLogin());
    }
}
