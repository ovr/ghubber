// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export function configureStore(preloadedState: Object) {
    const enhancer = compose(
        __DEV__
            ? applyMiddleware(thunk, logger)
            : applyMiddleware(thunk)
    );

    return createStore(reducers, preloadedState, enhancer)
}
