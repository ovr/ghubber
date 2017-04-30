// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { NavigationActions } from 'react-navigation';

import { NAVIGATION_SET_TITLE } from 'constants';

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

export function showRepository(owner: string, repo: string) {
    return NavigationActions.navigate({
        routeName: 'Repository',
        params: {
            owner,
            repo
        }
    })
}
