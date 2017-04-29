// @flow

import {
    PROFILE_REQUEST,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_FAIL
} from 'constants';

type ProfileState = {
    loading: boolean,
    error: null|Object
}

const initialState: ProfileState = {
    loading: false,
    error: null
}

export default (state: ProfileState = initialState, action: Object): ProfileState => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
