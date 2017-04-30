// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    REPOSITORY_REQUEST,
    REPOSITORY_REQUEST_SUCCESS,
    REPOSITORY_REQUEST_FAIL
} from 'constants';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

type RepositoryState = {
    loading: boolean,
    error: Object|null,
    repository: RepositoryEntity|null
}

const initialState: RepositoryState = {
    loading: false,
    error: null,
    repository: null
}

export default (state: RepositoryState = initialState, action: Object): RepositoryState => {
    switch (action.type) {
        case REPOSITORY_REQUEST:
            return {
                ...state,
                repository: null,
                loading: true,
                error: null
            }
        case REPOSITORY_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                repository: action.payload
            }
        case REPOSITORY_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        default:
            return state;
    }
}
