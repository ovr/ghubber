// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AppNavigator } from '../Navigator';
import { NAVIGATION_SET_TITLE, NAVIGATION_HOME, NAVIGATION_LOGIN } from 'constants';

type NavigationState = {

}

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Login')
);

export default (state: NavigationState = initialState, action: Object): NavigationState => {
    switch (action.type) {
        case NAVIGATION_LOGIN:
            // Reset whole Stack by new State
            return AppNavigator.router.getStateForAction(
                AppNavigator.router.getActionForPathAndParams('Login')
            );
        case NAVIGATION_HOME:
            // Reset whole Stack by new State
            return AppNavigator.router.getStateForAction(
                AppNavigator.router.getActionForPathAndParams('Home')
            );
        case NAVIGATION_SET_TITLE:
            return {
                ...state,
                params: {
                    ...state.params,
                    title: action.payload
                }
            }
        default:
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
}
