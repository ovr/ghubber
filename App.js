// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { configureStore } from 'utils';

export default class App extends Component {
  render() {

    const store = configureStore({});

    return (
        <Provider store={store}>
          <View style={styles.container}>

          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
