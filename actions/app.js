// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { deleteAuthorization } from 'github-flow-js';
import { showLogin } from 'actions';
import {
    APP_LOGOUT_SUCCESS
} from 'constants';

// import flow types
import type { AppState } from 'reducers/app';

export function logout() {
    return (dispatch, getState) => {
        const state: AppState = getState().app;

        deleteAuthorization(state.authorization.id, {}).then(
            () => {
                // @todo
            },
            (err) => console.warn(err)
        );

        dispatch({
            type: APP_LOGOUT_SUCCESS
        });

        dispatch(showLogin());
    }
}
