// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { UIText } from 'components';

type Props = {
    reactions:? Array<Object>,
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

export default class ReactionGroup extends PureComponent<Props> {
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
            <View style={styles.reactions}>
                {
                    reactions.map(
                        (reaction, index) => {
                            return (
                                <UIText
                                    key={'reaction' + index}
                                    style={styles.reaction}
                                >
                                    {mapReaction(reaction.content)} {reaction.users.totalCount}
                                </UIText>
                            );
                        }
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    reactions: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 10
    },
    reaction: {
        flex: 1,
        flexDirection: 'row'
    }
});
