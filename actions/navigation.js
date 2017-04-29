// @flow

import { NavigationActions } from 'react-navigation';

export function showProfile() {
    return NavigationActions.navigate({ routeName: 'Profile' })
}
