// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoriesByUsername } from 'github-flow-js';
import {
    PROFILE_REPOSITORIES_REQUEST,
    PROFILE_REPOSITORIES_REQUEST_SUCCESS,
    PROFILE_REPOSITORIES_REQUEST_FAIL
} from 'constants';

export function fetchRepositories(id: string) {
    return dispatch => {
        dispatch({
            type: PROFILE_REPOSITORIES_REQUEST
        });

        const request = getRepositoriesByUsername({
            username: id
        });

        request.then(
            (result) => {
                dispatch({
                    type: PROFILE_REPOSITORIES_REQUEST_SUCCESS,
                    payload: result
                })
            },
            () => {
                dispatch({
                    type: PROFILE_REPOSITORIES_REQUEST_FAIL,
                    payload: result
                })
            }
        )
    }
}
