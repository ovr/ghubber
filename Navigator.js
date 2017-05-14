// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import { Home, LoginScreen, ProfileScreen, RepositoryScreen, AboutScreen, AccountIssues } from 'containers';

export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: Home
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                title: 'Profile'
            },
        },
        Repository: {
            screen: RepositoryScreen,
            navigationOptions: {
                title: 'Repository',
            },
        },
        AccountIssues: {
            screen: AccountIssues,
            navigationOptions: {
                title: 'Issues',
            },
        },
        AboutScreen: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
            },
        },
    },
    {
        cardStyle: {
            backgroundColor: 'white'
        }
    }
);

const AppWithNavigationState = ({ dispatch, navigation }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
