// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { default as Navigator } from './Navigator'
import { configureStore } from 'utils';

class App extends Component {
  render() {
    const store = configureStore({});

    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('ghubber', () => App);
