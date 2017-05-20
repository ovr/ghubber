// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Text, Platform } from 'react-native';
import { Avatar, Button } from 'components';
import { connect } from 'react-redux';
import { logout } from 'actions';

// import flow types
import type { AppState } from 'reducers/app';

type Props = {
    app: AppState,
    logout: typeof logout
}

class SideMenu extends PureComponent<void, Props, void> {
    render() {
        const { app, logout } = this.props;

        if (app.user === null) {
            return null;
        }

        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Avatar user={app.user} size={AVATAR_SIZE} style={styles.avatar} />
                    <View style={styles.headerRight}>
                        <Text style={styles.name} numberOfLines={1}>{app.user.name}</Text>
                        <Text style={styles.login} numberOfLines={1}>@{app.user.login}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Button style={styles.button} onPress={logout}>
                        Logout
                    </Button>
                </View>
            </View>
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
    body: {
        marginTop: 15
    }
});

export default connect(
    (state) => {
        return {
            app: state.app
        }
    },
    { logout }
)(SideMenu);
