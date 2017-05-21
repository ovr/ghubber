// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import { Avatar, OrganizationAvatar, Button } from 'components';
import { connect } from 'react-redux';
import { hideSideMenu, logout } from 'actions';

// import flow types
import type { AppState } from 'reducers/app';

type Props = {
    app: AppState,
    closeDrawer: () => null,
    hideSideMenu: typeof hideSideMenu,
    logout: typeof logout,
}

class SideMenu extends PureComponent<void, Props, void> {
    render() {
        const { hideSideMenu, app, logout } = this.props;

        if (app.user === null) {
            return null;
        }

        return (
            <ScrollView style={styles.root}>
                <View style={styles.header}>
                    <Avatar user={app.user} size={AVATAR_SIZE} style={styles.avatar} />
                    <View style={styles.headerRight}>
                        <Text style={styles.name} numberOfLines={1}>{app.user.name}</Text>
                        <Text style={styles.login} numberOfLines={1}>@{app.user.login}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    {
                        app.organizations && app.organizations.map(
                            (entity) => (
                                <View style={styles.organization}>
                                    <OrganizationAvatar organization={entity} size={30} />
                                    <Text style={styles.organizationLogin}>
                                        {entity.login}
                                    </Text>
                                </View>
                            )
                        )
                    }
                </View>
                <View style={styles.bottom}>
                    <Button style={styles.button} onPress={hideSideMenu}>
                        Close
                    </Button>
                    <Button style={styles.button} onPress={logout}>
                        Logout
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 25 : 0,
        paddingLeft: 10,
        paddingRight: 5
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#586069'
    },
    avatar: {
        borderRadius: AVATAR_SIZE / 2,
        marginRight: 15
    },
    headerRight: {
        width: 190
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
        marginTop: 15
    },
    button: {
        marginBottom: 10
    },
    organization: {
        flex: 0,
        flexDirection: 'row',
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
        }
    },
    { hideSideMenu, logout }
)(SideMenu);
