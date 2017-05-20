// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Text, Platform } from 'react-native';
import { Avatar } from 'components';
import { connect } from 'react-redux';

// import flow types
import type { AppState } from 'reducers/app';

type Props = {
    app: AppState,
}

class SideMenu extends PureComponent<void, Props, void> {
    render() {
        const { app } = this.props;

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
            </View>
        )
    }
}

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 25 : 0,
        paddingLeft: 10
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        borderRadius: AVATAR_SIZE / 2,
        marginRight: 15
    },
    headerRight: {
        width: 195
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    login: {
        fontSize: 18,
        color: '#586069',
    }
});

export default connect(
    (state) => {
        return {
            app: state.app
        }
    },
    { }
)(SideMenu);
