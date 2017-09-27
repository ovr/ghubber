// @flow
// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import * as React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions, Header } from 'react-navigation';
import { __ } from 'utils/i18n';

import type { NavigationState } from 'reducers/navigation';

import {
    ModalsContext,
    //
    SideMenuButton,
    SideMenuDrawer,
    HomeHeaderRight,
    //
    FeedScreen,
    FeedSettingsScreen,
    SettingsScreen,
    ThemeSelectScreen,
    LoginScreen,
    CommitScreen,
    RepositoryIssueScreen,
    RepositoryPullRequestScreen,
    ProfileScreen,
    RepositoryScreen,
    AboutScreen,
    AccountIssues,
    AccountPullRequests,
    AccountNotifications,
} from 'containers';

export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: FeedScreen,
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
        Issue: {
            screen: RepositoryIssueScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: `${params.repo}#${params.number}`
                };
            },
        },
        PullRequest: {
            screen: RepositoryPullRequestScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: `${params.repo}#${params.number}`
                };
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings'
            }
        },
        ThemeSelect: {
            screen: ThemeSelectScreen,
            navigationOptions: {
                header: null
            }
        },
        Commit: {
            screen: CommitScreen,
            navigationOptions: {
                title: 'Commit overview'
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
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: params.id ? params.id : 'Profile'
                };
            },
        },
        Repository: {
            screen: RepositoryScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: params.repo ? params.repo : 'Repository'
                };
            },
        },
        AccountIssues: {
            screen: AccountIssues,
            navigationOptions: {
                title: __('AccountIssues.Title'),
            },
        },
        AccountPullRequests: {
            screen: AccountPullRequests,
            navigationOptions: {
                title: __('AccountPullRequests.Title'),
            },
        },
        AccountNotifications: {
            screen: AccountNotifications,
            navigationOptions: {
                title: __('AccountNotifications.Title'),
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
        },
        navigationOptions: {
            // eslint-disable-next-line react/display-name
            header: (props) => <NavBar {...props} />,
        }
    }
);

const NavBar = connect(
    (state: State, ownProps) => ({
        getScreenDetails: (scene) => {
            const details = ownProps.getScreenDetails(scene);

            return {
                ...details,
                options: {
                    headerTintColor: state.settings.headerTitleColor,
                    headerTitleStyle: {
                        color: state.settings.headerTitleColor,
                    },
                    headerStyle: {
                        backgroundColor: state.settings.headerBackgroundColor
                    },
                    ...details.options,
                }
            };
        },
    })
)(Header);

type AppWithNavigationStateProps = {
    navigation: NavigationState,
    dispatch: Dispatch
};

class AppWithNavigationState extends React.Component<AppWithNavigationStateProps, void> {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const { dispatch, navigation } = this.props;

            if (navigation.index === 0) {
                return false;
            }

            dispatch(NavigationActions.back());

            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <SideMenuDrawer>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation,
                })} />
                <ModalsContext />
            </SideMenuDrawer>
        );
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation,
    settings: state.settings,
});

export default connect(mapStateToProps)(AppWithNavigationState);
