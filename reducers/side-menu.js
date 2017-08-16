// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    SIDEMENU_OPEN,
    SIDEMENU_CLOSE,
} from 'constants';

export type SideMenuState = {
    open: boolean,
}

const initialState: SideMenuState = {
    open: false,
};

export default (state: SideMenuState = initialState, action: Action): SideMenuState => {
    switch (action.type) {
        case SIDEMENU_OPEN:
            return {
                open: true
            };
        case SIDEMENU_CLOSE:
            return {
                open: false
            };
        default:
            return state;
    }
};
