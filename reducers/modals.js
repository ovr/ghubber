// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

export type ModalsState = {
    modals: Array<React$Element<any>>,
}

const initialState: ModalsState = {
    modals: [],
};

export default (state: NavigationState = initialState, action: Object): NavigationState => {
    switch (action.type) {
        case 'MODAL_ADD':
            state.modals.push(action.payload);

            return {
                ...state,
                modals: state.modals.slice()
            };
        case 'MODAL_CLOSE':
            return {
                ...state,
                modals: []
            };
    }

    return state;
};
