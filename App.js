// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';
import { Provider } from 'react-redux';
import { before } from 'github-flow-js/Client';

import { default as Navigator } from './Navigator'
import { configureStore, getInitialState } from 'utils';

type State = {
    initialized: boolean,
    error: boolean,
    preloadedState: Object|null
}

class App extends Component<State, void, void> {
    state = {
        initialized: false,
        error: false,
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

            }
        )
    }

    render() {
        if (!this.state.initialized) {
            return null;
        }

        if (this.state.error) {
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
            const user = state.app.user;

            Sentry.setUserContext({
                id: user.id,
                login: user.login
            });
        }

        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ghubber', () => App);
