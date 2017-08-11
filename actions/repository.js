// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { getRepository } from 'github-flow-js';
import {
    REPOSITORY_REQUEST,
    REPOSITORY_REQUEST_SUCCESS
} from 'constants';
import { makeThunk } from 'utils/action-helper';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

export function fetchRepository(owner: string, repo: string): ThunkAction {
    return makeThunk(
        () => getRepository(owner, repo, {}),
        REPOSITORY_REQUEST
    );
}

export function setupRepository(repository: RepositoryEntity): Action {
    return {
        type: REPOSITORY_REQUEST_SUCCESS,
        payload: repository
    };
}
