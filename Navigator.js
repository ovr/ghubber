// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SideMenuButton } from 'containers';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import {
    Home,
    FeedScreen,
    FeedSettingsScreen,
    LoginScreen,
    ProfileScreen,
    RepositoryScreen,
    AboutScreen,
    AccountIssues,
    SideMenu,
    HomeHeaderRight
} from 'containers';

export const HomeScreeDrawer = DrawerNavigator({
    Home: {
        // screen: Home
        screen: FeedScreen
    },
}, {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props => <SideMenu />,
    initialRouteName: 'Home'
})


export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: HomeScreeDrawer,
            navigationOptions: {
                headerLeft: <SideMenuButton />,
                headerRight: <HomeHeaderRight />
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        FeedSettings: {
            screen: FeedSettingsScreen,
            navigationOptions: {
                title: 'Feed Settings'
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
