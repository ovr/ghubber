// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    PROFILE_REPOSITORIES_REQUEST,
    PROFILE_REPOSITORIES_REQUEST_SUCCESS,
    PROFILE_REPOSITORIES_REQUEST_FAIL,
} from 'constants';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

type ProfileRepositoriesState = {
    loading: boolean,
    error: Object|null,
    user: Array<RepositoryEntity>
}

const initialState: ProfileRepositoriesState = {
    loading: false,
    error: null,
    repositories: []
}

export default (state: ProfileRepositoriesState = initialState, action: Object): ProfileRepositoriesState => {
    switch (action.type) {
        case PROFILE_REPOSITORIES_REQUEST:
            return {
                ...state,
                repositories: [],
                loading: true,
                error: null
            }
        case PROFILE_REPOSITORIES_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                repositories: action.payload
            }
        case PROFILE_REPOSITORIES_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        default:
            return state;
    }
}
