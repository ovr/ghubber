// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepositoriesByUsername } from 'github-flow-js';
import {
    PROFILE_REPOSITORIES_REQUEST,
    PROFILE_REPOSITORIES_REQUEST_SUCCESS,
    PROFILE_REPOSITORIES_REQUEST_FAIL,
    //
    PROFILE_REPOSITORIES_MORE_REQUEST,
    PROFILE_REPOSITORIES_MORE_REQUEST_SUCCESS,
    PROFILE_REPOSITORIES_MORE_REQUEST_FAIL
} from 'constants';

export function fetchRepositories(id: string) {
    return dispatch => {
        dispatch({
            type: PROFILE_REPOSITORIES_REQUEST
        });

        const request = getRepositoriesByUsername({
            username: id,
            "per_page": 50
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
                    type: PROFILE_REPOSITORIES_REQUEST_FAIL
                })
            }
        )
    }
}

export function fetchMoreRepositories(username: string, page: number) {
    return dispatch => {
        dispatch({
            type: PROFILE_REPOSITORIES_MORE_REQUEST
        });

        const request = getRepositoriesByUsername({
            username,
            page,
            "per_page": 50
        });

        request.then(
            (result) => {
                dispatch({
                    type: PROFILE_REPOSITORIES_MORE_REQUEST_SUCCESS,
                    payload: {
                        page: page,
                        repositories: result
                    }
                })
            },
            () => {
                dispatch({
                    type: PROFILE_REPOSITORIES_MORE_REQUEST_FAIL
                })
            }
        )
    }
}
