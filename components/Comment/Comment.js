// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { UIText, Avatar } from 'components';

type Props = {
    comment: Object,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        borderColor: '#d1d5da',
        borderWidth: 1,
        marginBottom: 15
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f8ff',
        borderColor: '#d1d5da',
        borderBottomWidth: 1,
    },
    body: {
        padding: 5
    },
    avatar: {
        marginRight: 10,
    },
});

export default class Comment extends PureComponent<Props, void> {
    render() {
        const { comment } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Avatar user={comment.author} size={40} style={styles.avatar} />
                    <UIText>@{comment.author.login}</UIText>
                </View>
                <View style={styles.body}>
                    <UIText>{comment.body}</UIText>
                </View>
            </View>
        );
    }
}
