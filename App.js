// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { before } from 'github-flow-js/Client';
import { initApp } from 'actions';

import { default as Navigator } from './Navigator'
import { configureStore, getInitialState } from 'utils';

type State = {
    initialized: boolean,
    preloadedState:? Object
}

class App extends Component<void, void, State> {
    state: State = {
        initialized: false,
        preloadedState: null
    }

    componentWillMount() {
        getInitialState().then(
            (state) => {
                this.setState({
                    initialized: true,
                    preloadedState: state
                })
            },
            (error) => {
                Sentry.captureException(error);

                this.setState({
                    initialized: true,
                    preloadedState: {}
                })
            }
        )
    }

    render() {
        if (!this.state.initialized) {
            return null;
        }

        if (!this.state.preloadedState) {
            return null;
        }

        const store = configureStore(this.state.preloadedState);

        before(
            (requestOptions) => {
                const state = store.getState();

                if (state.app.authorization) {
                    requestOptions.headers = {
                        ...requestOptions.headers,
                        Authorization: 'token ' + state.app.authorization.token
                    }
                }
            }
        )

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
