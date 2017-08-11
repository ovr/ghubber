// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { before } from 'github-flow-js/Client';
import { initApp } from 'actions';

import { default as Navigator } from './Navigator';
import { configureStore, getInitialState } from 'utils';
import { captureException } from 'utils/errors';

type ApplicationStateNotInitialized = {
    initialized: false,
    store: null
}

type ApplicationStateInitialized = {
    initialized: true,
    store: Store
}

type ApplicationState = ApplicationStateNotInitialized | ApplicationStateInitialized;

class App extends PureComponent<void, void, ApplicationState> {
    state: ApplicationState = {
        initialized: false,
        store: null
    };

    componentWillMount() {
        getInitialState().then(
            (initialState: Object) => {
                this.setState({
                    initialized: true,
                    store: configureStore(initialState)
                });
            },
            (error) => {
                captureException(error);

                this.setState({
                    initialized: true,
                    store: configureStore({})
                });
            }
        );
    }

    render() {
        if (!this.state.initialized) {
            return null;
        }

        const store = this.state.store;

        before(
            (requestOptions) => {
                const state = store.getState();

                if (state.app.authorization) {
                    requestOptions.headers = {
                        ...requestOptions.headers,
                        Authorization: 'token ' + state.app.authorization.token
                    };
                }
            }
        );

        const state = store.getState();

        if (state.app.user) {
            store.dispatch(initApp());
        }

        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ghubber', () => App);
