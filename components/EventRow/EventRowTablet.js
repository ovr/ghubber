// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'components';
import Icon from 'react-native-vector-icons/Octicons';

// import flow types
import type { PushEvent, PullRequestEvent } from 'github-flow-js';

type Props = {
    event: PushEvent | PullRequestEvent,
    onPress: () => void
};

const RefsHeadPrefixLenght = 'refs/heads/'.length;

function filterBranchName(refs: string): string {
    return refs.substring(RefsHeadPrefixLenght);
}

export default class EventRowTablet extends PureComponent<void, Props, void> {
    renderCommitsList(payload: Object): React.Element<any> | null {
        if (!payload.commits) {
            return null;
        }

        let commits = payload.commits;
        let moreCommits = false;

        if (payload.commits && payload.commits.length > 3) {
            commits = payload.commits.slice(0, 3);
            moreCommits = payload.commits.length - 3;
        }

        return (
            <View style={styles.commitsList}>
                {
                    commits.map(
                        (item) => {
                            return (
                                <View key={item.sha}>
                                    <Text numberOfLines={1}>
                                        <Text style={styles.commitSHA}>{item.sha.substring(0, 7)}</Text> {item.message}
                                    </Text>
                                </View>
                            )
                        }
                    )
                }
                {
                    moreCommits ? <Text style={styles.moreCommits}>({moreCommits}) commit(s) was hidden</Text> : null
                }
            </View>
        )
    }

    renderPushEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.event}>
                <View style={styles.left}>
                    <Icon name="git-commit" size={32} />
                </View>
                <View style={styles.right}>
                    <Text>
                        <Text style={styles.login}>{event.actor.login + " "}</Text>
                        pushed to <Text style={styles.branchName}>{filterBranchName(event.payload.ref)}</Text> at
                        <Text style={styles.repoName}>{" " + event.repo.name}</Text>
                    </Text>
                    <View style={styles.rightBottom}>
                        <Avatar user={event.actor} size={24} style={styles.avatar} />
                        {this.renderCommitsList(event.payload)}
                    </View>
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
                        <Text style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</Text>
                    </Text>
                    <View style={styles.rightBottom}>
                        <Avatar user={event.actor} size={24} style={styles.avatar} />
                        <Text numberOfLines={1} style={styles.commentBody}>
                            {event.payload.issue.title}
                        </Text>
                    </View>
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
                        commented on issue
                        <Text style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</Text>
                    </Text>
                    <View style={styles.rightBottom}>
                        <Avatar user={event.actor} size={24} style={styles.avatar} />
                        <Text numberOfLines={1} style={styles.commentBody}>
                            {event.payload.comment.body}
                        </Text>
                    </View>
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
            <View style={styles.event}>
                <Text>This type of event ({event.type}) does not supported inside this version</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    event: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eff3f6',
        paddingBottom: 10,
        marginBottom: 10
    },
    left: {
        marginRight: 10
    },
    right: {
        flex: 1,
    },
    rightBottom: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
    },
    login: {
        fontSize: 16,
        color: '#0366d6'
    },
    repoName: {
        fontSize: 17,
        color: '#0366d6'
    },
    branchName: {
        color: '#0366d6'
    },
    commitSHA: {
        color: '#0366d6'
    },
    commitsList: {
        flex: 1,
    },
    moreCommits: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});
