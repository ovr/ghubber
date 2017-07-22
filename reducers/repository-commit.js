// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    REPOSITORY_COMMIT_REQUEST,
    REPOSITORY_COMMIT_REQUEST_SUCCESS,
    REPOSITORY_COMMIT_REQUEST_FAIL
} from 'constants';

// import flow types
import type { CommitEntity } from 'github-flow-js';

export type RepositoryCommitState = {
    loading: boolean,
    error:? Error,
    commit:? CommitEntity
}

const initialState: RepositoryCommitState = {
    loading: false,
    error: null,
    commit: null
}

export default (state: RepositoryCommitState = initialState, action: Object): RepositoryCommitState => {
    switch (action.type) {
        case REPOSITORY_COMMIT_REQUEST:
            return {
                ...state,
                commit: null,
                loading: true,
                error: null
            }
        case REPOSITORY_COMMIT_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                commit: action.payload
            }
        case REPOSITORY_COMMIT_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: new Error('Unknown error @todo')
            }
        default:
            return state;
    }
}
