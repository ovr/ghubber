// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

// import flow types
import type { PushEvent, PullRequestEvent } from 'github-flow-js';

type Props = {
    event: PushEvent | PullRequestEvent,
    onPress: () => void
};

export default class EventRowTablet extends PureComponent<void, Props, void> {
    renderIssueCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View>
                <Text>
                    <Text>{event.actor.login}</Text>
                    commented on pull request
                </Text>
            </View>
        )
    }

    render(): React.Element<any> {
        const { event, onPress } = this.props;

        switch (event.type) {
            case 'IssueCommentEvent':
                return this.renderIssueCommentEvent(event);
        }

        return (
            <View>
                <Text>This type of event ({event.type}) is unsupported inside this version</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
