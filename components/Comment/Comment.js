// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UIText, Avatar } from 'components';
import { connect } from 'react-redux';
import { showProfile } from 'actions';

type Props = {
    comment: Object,
    //
    showProfile: typeof showProfile
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

class Comment extends PureComponent<Props> {
    onAuthorPress = () => {
        const { comment, showProfile } = this.props;

        showProfile(comment.author.login);
    };

    render() {
        const { comment } = this.props;

        return (
            <View style={styles.root}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={this.onAuthorPress}
                >
                    <Avatar user={comment.author} size={40} style={styles.avatar} />
                    <UIText>@{comment.author.login}</UIText>
                </TouchableOpacity>
                <View style={styles.body}>
                    <UIText>{comment.body}</UIText>
                </View>
            </View>
        );
    }
}

export default connect(
    null,
    { showProfile }
)(Comment);
