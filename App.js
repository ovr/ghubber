// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { before } from 'github-flow-js/Client';
import DrawerLayout from 'react-native-drawer-layout';
import { SideMenu } from 'containers';

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

        return (
            <Provider store={store}>
                <DrawerLayout
                    drawerBackgroundColor="#fff"
                    drawerWidth={300}
                    drawerLockMode="unlocked"
                    keyboardDismissMode="on-drag"
                    statusBarBackgroundColor="#fff"
                    renderNavigationView={() => <SideMenu />}
                >
                    <Navigator />
                </DrawerLayout>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ghubber', () => App);
