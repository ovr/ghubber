// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'components';
import { showFeedSettings } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';
import type { AppState } from 'reducers/app';

type Props = {
    feed: AccountFeedState,
    app: AppState,
}

class FeedTopPanel extends PureComponent<void, Props, void> {
    render() {
        const { app, showFeedSettings } = this.props;

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.selectWrapper} onPress={showFeedSettings}>
                    <Avatar user={app.user} size={20} style={styles.avatar}/>
                    <Text style={styles.selectText}>
                        ovr ▾
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        flexDirection: 'row',
        paddingVertical: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8'
    },
    selectWrapper: {
        borderColor: 'rgba(27, 31, 35, 0.2)',
        borderWidth: 1,
        backgroundColor: '#e6ebf1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 6
    },
    selectText: {
        color: '#24292e',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default connect(
    (state) => ({
        feed: state.accountFeed,
        app: state.app
    }),
    { showFeedSettings }
)(FeedTopPanel);
