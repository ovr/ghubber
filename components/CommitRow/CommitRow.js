// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { UIText, Avatar } from 'components';

type Props = {
    commit: Object,
    onPress: (commit: Object) => any
};

export default class CommitRow extends PureComponent<void, Props, void> {
    render() {
        const { commit, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.root} onPress={onPress}>
                <Avatar user={commit.author} size={25} style={styles.avatar} />
                <UIText numberOfLines={1} style={styles.message}>{commit.message}</UIText>
            </TouchableOpacity>
        )
    }
}

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
