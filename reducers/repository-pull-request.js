// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    REPOSITORY_PR_REQUEST,
    REPOSITORY_PR_REQUEST_SUCCESS,
    REPOSITORY_PR_REQUEST_FAIL
} from 'constants';

export type RepositoryPullRequestState = {
    loading: boolean,
    error:? Error,
    // @todo GraphQL types!!!
    pullRequest:? Object
}

const initialState: RepositoryPullRequestState = {
    loading: false,
    error: null,
    pullRequest: null
};

export default (state: RepositoryPullRequestState = initialState, action: Action): RepositoryPullRequestState => {
    switch (action.type) {
        case REPOSITORY_PR_REQUEST:
            return {
                ...state,
                pullRequest: null,
                loading: true,
                error: null
            };
        case REPOSITORY_PR_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                pullRequest: action.payload
            };
        case REPOSITORY_PR_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
