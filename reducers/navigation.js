// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AppNavigator } from '../Navigator';
// import { NAVIGATION_SET_TITLE, NAVIGATION_HOME, NAVIGATION_LOGIN } from 'constants';

export type NavigationState = {
    params?: any
}

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Login')
);

export default (state: NavigationState = initialState, action: Object): NavigationState => {
    let nextState = AppNavigator.router.getStateForAction(action, state);

    // @todo Fix or ask related question inside react-navigation project, because I cannot explain
    // how to get route params inside state, not route
    if (nextState && nextState.index) {
        const route = nextState.routes[nextState.index];

        if (route.params) {
            nextState = {
                ...nextState,
                params: route.params
            };
        } else {
            nextState = {
                ...nextState,
                params: null
            };
        }
    }

    return nextState || state;

    // switch (action.type) {
        // case NAVIGATION_LOGIN:
        //     // Reset whole Stack by new State
        //     return AppNavigator.router.getStateForAction(
        //         AppNavigator.router.getActionForPathAndParams('Login')
        //     );
        // case NAVIGATION_HOME:
        //     // Reset whole Stack by new State
        //     return AppNavigator.router.getStateForAction(
        //         AppNavigator.router.getActionForPathAndParams('Home')
        //     );
        // default:
    //
    // }
};
