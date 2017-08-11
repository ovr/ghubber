// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    REPOSITORY_ISSUE_REQUEST,
    REPOSITORY_ISSUE_REQUEST_FAIL,
    REPOSITORY_ISSUE_REQUEST_SUCCESS
} from 'constants';

// import flow types
import type { IssueEntity } from 'github-flow-js';

export type RepositoryIssueState = {
    loading: boolean,
    error:? Error,
    issue:? IssueEntity
}

const initialState: RepositoryIssueState = {
    loading: false,
    error: null,
    issue: null
};

export default (state: RepositoryIssueState = initialState, action: Action): RepositoryIssueState => {
    switch (action.type) {
        case REPOSITORY_ISSUE_REQUEST:
            return {
                ...state,
                issue: null,
                loading: true,
                error: null
            };
        case REPOSITORY_ISSUE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                issue: action.payload
            };
        case REPOSITORY_ISSUE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
