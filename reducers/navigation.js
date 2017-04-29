// @flow

import { AppNavigator } from '../Navigator';

type NavigationState = {

}

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state: NavigationState = initialNavState, action: Object): NavigationState => {
    let nextState = AppNavigator.router.getStateForAction(action, state);

    return nextState || state;
}
