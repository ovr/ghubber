// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Avatar, OrganizationAvatar, Button } from 'components';
import { connect } from 'react-redux';
import { hideSideMenu, logout, showAccount, showAbout } from 'actions';

// import flow types
import type { AppState } from 'reducers/app';

type Props = {
    app: AppState,
    hideSideMenu: typeof hideSideMenu,
    logout: typeof logout,
    showAccount: typeof showAccount,
    showAbout: typeof showAbout,
}

class SideMenu extends PureComponent<Props, void> {
    render() {
        const { app, logout, showAccount, showAbout, hideSideMenu } = this.props;

        if (app.user === null) {
            return null;
        }

        const makeNavigation = (next: Function) => {
            hideSideMenu();

            setTimeout(
                next,
                250
            );
        };

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.header} onPress={() => makeNavigation(showAccount)}>
                    <Avatar user={app.user} size={AVATAR_SIZE} style={styles.avatar} />
                    <View style={styles.headerRight}>
                        <Text style={styles.login} numberOfLines={1}>@{app.user.login}</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView style={styles.body}>
                    {
                        app.organizations && app.organizations.map(
                            (entity) => (
                                <View style={styles.organization} key={'sm-org-' + entity.id}>
                                    <OrganizationAvatar organization={entity} size={30} />
                                    <Text style={styles.organizationLogin}>
                                        {entity.login}
                                    </Text>
                                </View>
                            )
                        )
                    }
                    <View style={styles.bottom}>
                        <Button style={styles.button} onPress={() => makeNavigation(showAbout)}>
                            About
                        </Button>
                        <Button style={styles.button} onPress={() => makeNavigation(logout)}>
                            Logout
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const AVATAR_SIZE = APPBAR_HEIGHT * 0.65;

let platformContainerStyles;

if (Platform.OS === 'ios') {
    platformContainerStyles = {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0, 0, 0, .3)',
    };
} else {
    platformContainerStyles = {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
    };
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Platform.OS === 'ios' ? '#F7F7F7' : '#FFF',
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: APPBAR_HEIGHT,
        paddingHorizontal: 5,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: 'rgba(0, 0, 0, .1)',
        ...platformContainerStyles,
    },
    avatar: {
        // borderRadius: AVATAR_SIZE / 2,
        marginRight: 15
    },
    headerRight: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    login: {
        fontSize: 18,
        color: '#586069',
    },
    bottom: {
        marginTop: 15
    },
    body: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: 'rgba(0, 0, 0, .1)',
    },
    button: {
        marginBottom: 10
    },
    organization: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        marginBottom: 2
    },
    organizationLogin: {
        marginLeft: 10,
        fontSize: 18
    }
});

export default connect(
    (state) => {
        return {
            app: state.app
        };
    },
    { hideSideMenu, logout, showAccount, showAbout }
)(SideMenu);
