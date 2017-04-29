// @flow

import { AppNavigator } from '../Navigator';

type NavigationState = {

}

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Home')
);

export default (state: NavigationState = initialState, action: Object): NavigationState => {
    let nextState = AppNavigator.router.getStateForAction(action, state);

    // @todo Fix or ask related question inside app, because I cannot explain
    if (nextState && action.params) {
        nextState = {
            ...nextState,
            params: action.params
        }
    }

    return nextState || state;
}
