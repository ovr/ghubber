// @flow

import React, { Component } from 'react';
import { View, StyleSheet, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

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


const Navigator = StackNavigator({
    Home: { screen: App },
});

AppRegistry.registerComponent('ghubber', () => Navigator);
