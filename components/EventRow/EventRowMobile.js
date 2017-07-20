// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'components';
import { Sentry } from 'react-native-sentry';
import Icon from 'react-native-vector-icons/Octicons';
import I18n from 'utils/i18n';

// import flow types
import type { PushEvent, PullRequestEvent } from 'github-flow-js';

type Props = {
    event: PushEvent | PullRequestEvent,
};

const RefsHeadPrefixLenght = 'refs/heads/'.length;

function filterBranchName(refs: string): string {
    return refs.substring(RefsHeadPrefixLenght);
}

export default class EventRowMobile extends PureComponent<void, Props, void> {
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
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {I18n.t('EventRow.PushedTo')}&nbsp;
                    <Text style={styles.branchName}>{filterBranchName(event.payload.ref)}</Text>
                    &nbsp;{I18n.t('EventRow.At')}
                    <Text style={styles.repoName}>{" " + event.repo.name}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    {this.renderCommitsList(event.payload)}
                </View>
            </View>
        )
    }

    renderIssuesEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {event.payload.action} {I18n.t('EventRow.Issue')}
                    <Text style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    <Text numberOfLines={1} style={styles.commentBody}>
                        {event.payload.issue.title}
                    </Text>
                </View>
            </View>
        )
    }

    renderReleaseEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {event.payload.action} {I18n.t('EventRow.Release')}&nbsp;
                    <Text style={styles.repoName}>{event.payload.release.tag_name}</Text> {I18n.t('EventRow.At')}
                    &nbsp;<Text style={styles.repoName}>{event.repo.name}</Text>
                </Text>
            </View>
        )
    }

    renderPullRequestReviewCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {I18n.t('EventRow.CommentedPR')}
                    &nbsp;<Text style={styles.repoName}>{event.repo.name}#{event.payload.pull_request.number}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    <Text numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </Text>
                </View>
            </View>
        )
    }

    renderPullRequestEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {event.payload.action === I18n.t('EventRow.Closed') ? I18n.t('EventRow.Merged') : event.payload.action} {I18n.t('EventRow.PR')}
                    &nbsp;<Text style={styles.repoName}>{event.repo.name}#{event.payload.pull_request.number}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    <Text numberOfLines={2} style={styles.commentBody}>
                        {I18n.t('EventRow.CommitSummary', {
                            commits: event.payload.pull_request.commits,
                            additions: event.payload.pull_request.additions,
                            deletions: event.payload.pull_request.deletions
                        })}
                    </Text>
                </View>
            </View>
        )
    }

    renderCommitCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    commented on commit
                    <Text style={styles.repoName}>{" " + event.repo.name}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    <Text numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </Text>
                </View>
            </View>
        )
    }

    renderIssueCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {I18n.t('EventRow.CommentedIssue')}
                    <Text style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</Text>
                </Text>
                <View style={styles.rightBottom}>
                    <Text numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </Text>
                </View>
            </View>
        )
    }

    renderCreateEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {I18n.t('EventRow.Created')} {event.payload.ref_type} <Text style={styles.branchName}>{event.payload.ref}</Text>
                    &nbsp;{I18n.t('EventRow.At')} <Text style={styles.branchName}>{event.repo.name}</Text>
                </Text>
            </View>
        )
    }

    renderDeleteEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    {I18n.t('EventRow.Created')} {event.payload.ref_type} <Text style={styles.branchName}>{event.payload.ref}</Text>
                    &nbsp;{I18n.t('EventRow.At')} <Text style={styles.branchName}>{event.repo.name}</Text>
                </Text>
            </View>
        )
    }

    renderWatchEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <Text>
                    <Text style={styles.login}>{event.actor.login + " "}</Text>
                    starred <Text style={styles.branchName}>{event.repo.name}</Text>
                </Text>
            </View>
        )
    }

    render(): React.Element<any> {
        const { event } = this.props;

        try {
            let iconName = null;
            let showAvatar = true;
            let content = null;

            switch (event.type) {
                case 'PullRequestEvent':
                    iconName = 'git-commit';
                    content = this.renderPullRequestEvent(event);
                    break;
                case 'PullRequestReviewCommentEvent':
                    iconName = 'comment-discussion';
                    content = this.renderPullRequestReviewCommentEvent(event);
                    break;
                case 'ReleaseEvent':
                    iconName = 'tag';
                    content = this.renderReleaseEvent(event);
                    break;
                case 'CreateEvent':
                    iconName = 'tag';
                    // because one line event
                    showAvatar = false;
                    content = this.renderCreateEvent(event);
                    break;
                case 'DeleteEvent':
                    iconName = 'git-branch';
                    content = this.renderDeleteEvent(event);
                    break;
                case 'PushEvent':
                    iconName = 'git-commit';
                    content = this.renderPushEvent(event);
                    break;
                case 'CommitCommentEvent':
                    iconName = 'comment-discussion';
                    content = this.renderCommitCommentEvent(event);
                    break;
                case 'IssueCommentEvent':
                    iconName = 'comment-discussion';
                    content = this.renderIssueCommentEvent(event);
                    break;
                case 'IssuesEvent':
                    iconName = 'issue-opened';
                    content = this.renderIssuesEvent(event);
                    break;
                case 'WatchEvent':
                    iconName = 'star';
                    showAvatar = false;
                    content = this.renderWatchEvent(event);
                    break;
                default:
                    return (
                        <View style={styles.event}>
                            <Text>{I18n.t('EventRow.TypeEventNotSupported', {eventType: event.type})}</Text>
                        </View>
                    )
            }

            return (
                <View style={styles.event}>
                    <View style={styles.left}>
                        <Icon name={iconName} size={26} />
                        { showAvatar ? <Avatar user={event.actor} size={26} /> : null }
                    </View>
                    {content}
                </View>
            )
        } catch (e) {
            Sentry.captureException(e);

            return (
                <View style={styles.event}>
                    <Text>{I18n.t('EventRow.UnexpectedException', {eventType: event.type })}</Text>
                </View>
            )
        }
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
        marginRight: 6,
    },
    right: {
        flex: 1,
    },
    rightBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentBody: {
        flex: 1,
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
