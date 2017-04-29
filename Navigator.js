
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { Home, Profile } from 'containers';

export const AppNavigator = StackNavigator({
    Home: { screen: Home },
    Profile: { screen: Profile }
});

const AppWithNavigationState = ({ dispatch, navigation }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
