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
        flexDirection: 'row'
    }
});

export default class Comment extends PureComponent<void, Props, void> {
    render() {
        const { comment } = this.props;

        return (
            <View style={styles.root}>
                <Avatar user={comment.author} />
                <View>
                    <UIText>{comment.body}</UIText>
                </View>
            </View>
        )
    }
}
