// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getOrganizationsByUsername } from 'github-flow-js';
import {
    PROFILE_ORGANIZATIONS_REQUEST,
    PROFILE_ORGANIZATIONS_REQUEST_SUCCESS,
    PROFILE_ORGANIZATIONS_REQUEST_FAIL,
} from 'constants';

export function fetchOrganizations(id: string) {
    return dispatch => {
        dispatch({
            type: PROFILE_ORGANIZATIONS_REQUEST
        });

        const request = getOrganizationsByUsername({
            username: id
        });

        request.then(
            (result) => {
                dispatch({
                    type: PROFILE_ORGANIZATIONS_REQUEST_SUCCESS,
                    payload: result
                })
            },
            () => {
                dispatch({
                    type: PROFILE_ORGANIZATIONS_REQUEST_FAIL
                })
            }
        )
    }
}
