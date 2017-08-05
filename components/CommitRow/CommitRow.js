// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { UIText, Avatar } from 'components';

type Props = {
    commit: Object,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10
    },
    avatar: {
        flex: 0,
        marginRight: 10
    },
    message: {
        flex: 1
    }
});

export default class CommitRow extends PureComponent<void, Props, void> {
    render() {
        const { commit } = this.props;

        return (
            <View style={styles.root}>
                <Avatar user={commit.author} size={25} style={styles.avatar} />
                <UIText numberOfLines={1} style={styles.message}>{commit.message}</UIText>
            </View>
        )
    }
}
