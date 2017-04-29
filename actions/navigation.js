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
