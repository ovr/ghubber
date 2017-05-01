// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { NavigationActions } from 'react-navigation';
import { NAVIGATION_SET_TITLE } from 'constants';
import { setupRepository } from './repository';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

export function showProfile(id: string) {
    return NavigationActions.navigate({
        routeName: 'Profile',
        params: {
            id
        }
    })
}

export function setTitle(title: Object) {
    return {
        type: NAVIGATION_SET_TITLE,
        payload: title
    };
}

export function showRepositoryByParams(owner: string, repo: string) {
    return NavigationActions.navigate({
        routeName: 'Repository',
        params: {
            owner,
            repo
        }
    })
}

export function showRepository(repository: RepositoryEntity) {
    return dispatch => {
        dispatch(setupRepository(repository));

        dispatch(
            NavigationActions.navigate({
                routeName: 'Repository',
                params: {
                    owner: repository.owner.login,
                    repo: repository.name
                }
            })
        )
    }
}
