// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getUserById } from 'github-flow-js';
import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAIL
} from 'constants';

import { setTitle } from './navigation';

export function fetchProfile(id: string) {
    return dispatch => {
        dispatch({
            type: PROFILE_REQUEST
        });

        const request = getUserById({
            id
        });

        request.then(
            (user) => {
                dispatch({
                    type: PROFILE_REQUEST_SUCCESS,
                    payload: user
                })

                dispatch(setTitle(user.name));
            },
            () => {
                dispatch({
                    type: PROFILE_REQUEST_FAIL
                })
            }
        )
    }
}
