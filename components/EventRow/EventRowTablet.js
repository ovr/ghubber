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
    renderPushEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.event}>
                <View style={styles.left}>
                    <Icon name="git-commit" size={32} />
                </View>
                <View>
                    <Text>
                        <Text style={styles.login}>{event.actor.login + " "}</Text>
                        pushed
                    </Text>
                </View>
            </View>
        )
    }

    renderIssuesEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.event}>
                <View style={styles.left}>
                    <Icon name="issue-opened" size={32} />
                </View>
                <View>
                    <Text>
                        <Text style={styles.login}>{event.actor.login + " "}</Text>
                        {event.payload.action} issue
                        <Text style={styles.repoName}>{" " + event.repo.name}</Text>
                    </Text>
                </View>
            </View>
        )
    }

    renderIssueCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.event}>
                <View style={styles.left}>
                    <Icon name="comment-discussion" size={32} />
                </View>
                <View>
                    <Text>
                        <Text style={styles.login}>{event.actor.login + " "}</Text>
                        commented on pull request
                        <Text style={styles.repoName}>{" " + event.repo.name}</Text>
                    </Text>
                    <Text numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </Text>
                </View>
            </View>
        )
    }

    render(): React.Element<any> {
        const { event, onPress } = this.props;

        switch (event.type) {
            case 'PushEvent':
                return this.renderPushEvent(event);
            case 'IssueCommentEvent':
                return this.renderIssueCommentEvent(event);
            case 'IssuesEvent':
                return this.renderIssuesEvent(event);
        }

        return (
            <View>
                <Text>This type of event ({event.type}) is unsupported inside this version</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    event: {
        flex: 1,
        flexDirection: 'row'
    },
    left: {
        marginRight: 10
    },
    login: {
        fontSize: 18,
        color: '#0366d6'
    },
    repoName: {
        fontSize: 18,
        color: '#0366d6'
    },
});
