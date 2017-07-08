// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { NavigationActions } from 'react-navigation';
import { NAVIGATION_SET_TITLE, NAVIGATION_HOME, NAVIGATION_LOGIN } from 'constants';
import { setupRepository } from './repository';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

export function showAccount(): ThunkAction {
    return (dispatch, getState) => {
        const app = getState().app;

        dispatch(showProfile(app.user.login));
    }
}

export function showFeedSettings() {
    return NavigationActions.navigate({
        routeName: 'FeedSettings',
    })
}

export function showSideMenu() {
    return NavigationActions.navigate({
        routeName: 'DrawerOpen',
    })
}

export function hideSideMenu() {
    return NavigationActions.navigate({
        routeName: 'DrawerClose',
    })
}

export function showAccountIssues() {
    return NavigationActions.navigate({
        routeName: 'AccountIssues',
    })
}

export function showAccountPullRequests() {
    return NavigationActions.navigate({
        routeName: 'AccountPullRequests',
    })
}

export function showAbout() {
    return NavigationActions.navigate({
        routeName: 'AboutScreen',
    })
}

export function showProfile(id: string) {
    return NavigationActions.navigate({
        routeName: 'Profile',
        params: {
            id
        }
    })
}

export function showLogin() {
    return {
        type: 'Navigation/RESET',
        index: 0,
        actions: [{
            type: 'Navigation/NAVIGATE',
            routeName:'Login'
        }]
    }
}

export function showHome() {
    return {
        type: 'Navigation/RESET',
        index: 0,
        actions: [{
            type: 'Navigation/NAVIGATE',
            routeName:'Home'
        }]
    }
}

// @todo Not working!
export function setTitle(title: string) {
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

export function showRepository(repository: RepositoryEntity): ThunkAction {
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
