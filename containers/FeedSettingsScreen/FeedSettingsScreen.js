// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, OrganizationAvatar } from 'components';
import { showHome, changeAccountFeedLogin } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';
import type { AppState } from 'reducers/app';

type Props = {
    feed: AccountFeedState,
    app: AppState,
    showHome: typeof showHome,
    changeAccountFeedLogin: typeof changeAccountFeedLogin,
}

class FeedSettingsScreen extends PureComponent<void> {
    static defaultProps: Props;
    render() {
        const { app, showHome, changeAccountFeedLogin } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.list}>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => {
                            changeAccountFeedLogin(app.user.login);
                            showHome();
                        }}
                    >
                        <Avatar user={app.user} size={24} style={styles.avatar} />
                        <Text>{app.user.login}</Text>
                    </TouchableOpacity>
                    {
                        app.organizations && app.organizations.map(
                            (entity) => {
                                return (
                                    <TouchableOpacity
                                        key={'organization' + entity.login}
                                        style={styles.row}
                                        onPress={() => {
                                            changeAccountFeedLogin(entity.login);
                                            showHome();
                                        }}
                                    >
                                        <OrganizationAvatar organization={entity} size={24} style={styles.avatar} />
                                        <Text>{entity.login}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        )
                    }
                </View>
                {/*<Button>Apply</Button>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        marginHorizontal: 15
    },
    list: {
        marginBottom: 10
    },
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        marginRight: 10
    }
});

export default connect(
    (state) => ({
        feed: state.accountFeed,
        app: state.app,
    }),
    { showHome, changeAccountFeedLogin }
)(FeedSettingsScreen);
