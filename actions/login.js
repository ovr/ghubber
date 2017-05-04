// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showHome } from './navigation';
import {
    LOGIN_REQUEST
} from 'constants';

export function makeLogin(username: string, password: string, code: string) {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })

        //dispatch(showHome());
    }
}

