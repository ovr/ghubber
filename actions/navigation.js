// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { NavigationActions } from 'react-navigation';

export function showProfile(id: string) {
    return NavigationActions.navigate({
        routeName: 'Profile',
        params: {
            id
        }
    })
}

export function showRepository(id: string) {
    return NavigationActions.navigate({
        routeName: 'Repository',
        params: {
            id
        }
    })
}
