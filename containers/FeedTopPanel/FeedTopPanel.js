// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, OrganizationAvatar } from 'components';
import { showFeedSettings } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';
import type { AuthAppState } from 'reducers/app';

type Props = {
    feed: AccountFeedState,
    app: AuthAppState,
    showFeedSettings: typeof showFeedSettings
}

class FeedTopPanel extends PureComponent<Props> {
    render() {
        const { app, feed, showFeedSettings } = this.props;

        let isOrganization = false;
        let selectedEntity = app.user;

        if (feed.login !== null && feed.login !== app.user.login) {
            const result = app.organizations.find(
                (entity) => {
                    return entity.login === feed.login;
                }
            );

            if (result) {
                isOrganization = true;
                selectedEntity = result;
            }
        }

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.selectWrapper} onPress={showFeedSettings}>
                    {
                        isOrganization ? (
                            <OrganizationAvatar organization={selectedEntity} size={20} style={styles.avatar}/>
                        ) : (
                            <Avatar user={selectedEntity} size={20} style={styles.avatar}/>
                        )
                    }
                    <Text style={styles.selectText}>
                        {selectedEntity.login} ▾
                    </Text>
                </TouchableOpacity>
            </View>
        );
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
});

export default connect(
    (state) => ({
        feed: state.accountFeed,
        app: state.app
    }),
    { showFeedSettings }
)(FeedTopPanel);
