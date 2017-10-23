// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { UIText } from 'components';
import { deleteReaction } from 'actions';

type Props = {
    where: 'issue' | 'pull-request' | 'issue-comment' | 'pull-request-comment',
    reactions:? Array<Object>,
    //
    deleteReaction: typeof deleteReaction
};

function mapReaction(name: string): string {
    switch (name) {
        case 'THUMBS_UP':
            return '👍';
        case 'THUMBS_DOWN':
            return '👎';
        case 'LAUGH':
            return '😆 ';
        case 'HOORAY':
            return '🎉';
        case 'CONFUSED':
            return '😕';
        case 'HEART':
            return '❤️';
    }

    return name;
}

class ReactionGroup extends PureComponent<Props> {
    pressOnReaction = (reaction: Object) => {
        if (reaction.viewerHasReacted) {
            this.props.deleteReaction(reaction.subject.databaseId);
        }
    };

    renderReaction = (reaction: Object, index: number) => {
        let containerStyle = styles.reaction;

        if (reaction.viewerHasReacted) {
            containerStyle = StyleSheet.flatten([styles.reaction, styles.viewerHasReacted]);
        }

        return (
            <TouchableOpacity
                style={containerStyle}
                onPress={() => this.pressOnReaction(reaction)}
            >
                <UIText
                    key={'reaction' + index}
                >
                    {mapReaction(reaction.content)} {reaction.users.totalCount}
                </UIText>
            </TouchableOpacity>
        );
    };

    render() {
        const { reactions } = this.props;

        if (!reactions) {
            return null;
        }

        let total = 0;

        reactions.forEach(
            (reaction) => {
                total += reaction.users.totalCount;
            }
        );

        if (total === 0) {
            return null;
        }

        return (
            <View style={styles.container}>
                {reactions.map(this.renderReaction)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#e1e4e8',
    },
    viewerHasReacted: {
        backgroundColor: '#f1f8ff',
    },
    reaction: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderColor: '#e1e4e8',
        borderRightWidth: 1
    }
});

export default connect(
    null,
    { deleteReaction }
)(ReactionGroup);
