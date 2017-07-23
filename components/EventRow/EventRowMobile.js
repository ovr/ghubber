// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, UIText } from 'components';
import Icon from 'react-native-vector-icons/Octicons';

import { showRepositoryByParams, showRepositoryCommit } from 'actions';
import { captureException } from 'utils/errors';
import { filterBranchNameFromRefs } from 'utils/filters';
import { normalizeFont } from 'utils/helpers';
import { __ } from 'utils/i18n';
import moment from 'utils/moment';

// import flow types
import type {
    PushEvent,
    PullRequestEvent,
    PullRequestReviewCommentEvent,
    CommitCommentEvent
} from 'github-flow-js';

type Props = {
    event: PushEvent | PullRequestEvent,
    showRepositoryByParams: typeof showRepositoryByParams,
    showRepositoryCommit: typeof showRepositoryCommit,
};

// @todo Remove when we will support all events navigation
function isNavigationSupported(event: PushEvent | PullRequestEvent): boolean {
    switch (event.type) {
        case 'PushEvent':
        case 'WatchEvent':
            return true;
    }

    return false;
}

class EventRowMobile extends PureComponent<void, Props, void> {
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
                                    <UIText numberOfLines={1}>
                                        <UIText style={styles.commitSHA}>{item.sha.substring(0, 7)}</UIText> {item.message}
                                    </UIText>
                                </View>
                            )
                        }
                    )
                }
                {
                    moreCommits ? <UIText style={styles.moreCommits}>({moreCommits}) commit(s) was hidden</UIText> : null
                }
            </View>
        )
    }

    renderPushEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.PushedTo')}&nbsp;
                    <UIText style={styles.branchName}>{filterBranchNameFromRefs(event.payload.ref)}</UIText>&nbsp;
                    {__('EventRow.At')}
                    <UIText style={styles.repoName}>{" " + event.repo.name}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    {this.renderCommitsList(event.payload)}
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderIssuesEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__(`EventRow.IssuesActions.${event.payload.action}`)} {__('EventRow.Issue')}&nbsp;
                    <UIText style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    <UIText numberOfLines={1} style={styles.commentBody}>
                        {event.payload.issue.title}
                    </UIText>
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderReleaseEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__(`EventRow.ReleaseActions.${event.payload.action}`)} {__('EventRow.Release')}&nbsp;
                    <UIText style={styles.repoName}>{event.payload.release.tag_name}</UIText> {__('EventRow.At')}&nbsp;
                    <UIText style={styles.repoName}>{event.repo.name}</UIText>
                    <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
                </UIText>
            </View>
        )
    }

    renderPullRequestReviewCommentEvent(event: PullRequestReviewCommentEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.CommentedPR')}&nbsp;
                    <UIText style={styles.repoName}>{event.repo.name}#{event.payload.pull_request.number}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    <UIText numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </UIText>
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderPullRequestEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {
                        event.payload.action === 'closed' ?
                        __('EventRow.Actions.Merged') :
                        __(`EventRow.PullRequestActions.${event.payload.action}`)
                    }&nbsp;
                    {__('EventRow.PR')}&nbsp;
                    <UIText style={styles.repoName}>{event.repo.name}#{event.payload.pull_request.number}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    <UIText numberOfLines={2} style={styles.commentBody}>
                        {__('EventRow.CommitSummary', {
                            commits: event.payload.pull_request.commits,
                            additions: event.payload.pull_request.additions,
                            deletions: event.payload.pull_request.deletions
                        })}
                    </UIText>
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderCommitCommentEvent(event: CommitCommentEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.CommentedCommit')}&nbsp;
                    <UIText style={styles.repoName}>{" " + event.repo.name}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    <UIText numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </UIText>
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderIssueCommentEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.CommentedIssue')}&nbsp;
                    <UIText style={styles.repoName}>{" " + event.repo.name}{"#" + event.payload.issue.number}</UIText>
                </UIText>
                <View style={styles.rightBottom}>
                    <UIText numberOfLines={1} style={styles.commentBody}>
                        {event.payload.comment.body}
                    </UIText>
                </View>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderForkEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.Forked')} <UIText style={styles.branchName}>{event.repo.name}</UIText>&nbsp;
                    {__('EventRow.To')} <UIText style={styles.branchName}>{event.payload.forkee.full_name}</UIText>
                </UIText>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderCreateEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.Created')}&nbsp;
                    {__(`EventRow.CreateTypes.${event.payload.ref_type}`)}&nbsp;
                    <UIText style={styles.branchName}>{event.payload.ref}</UIText>&nbsp;
                    {__('EventRow.At')} <UIText style={styles.branchName}>{event.repo.name}</UIText>
                </UIText>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderDeleteEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.Created')}&nbsp;
                    {__(`EventRow.CreateTypes.${event.payload.ref_type}`)}&nbsp;
                    <UIText style={styles.branchName}>{event.payload.ref}</UIText>&nbsp;
                    {__('EventRow.At')} <UIText style={styles.branchName}>{event.repo.name}</UIText>
                </UIText>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    renderWatchEvent(event: PushEvent | PullRequestEvent): React.Element<any> {
        return (
            <View style={styles.right}>
                <UIText>
                    <UIText style={styles.login}>{event.actor.login + " "}</UIText>
                    {__('EventRow.Actions.Starred')}&nbsp;
                    <UIText style={styles.branchName}>{event.repo.name}</UIText>
                </UIText>
                <UIText style={styles.eventDate}>{moment(event.created_at).fromNow()}</UIText>
            </View>
        )
    }

    navigateEvent(event: PushEvent | PullRequestEvent): void {
        switch (event.type) {
            case 'PushEvent': {
                const parts = event.repo.name.split('/');
                this.props.showRepositoryCommit(parts[0], parts[1], event.payload.head);
                break;
            }
            case 'WatchEvent': {
                const parts = event.repo.name.split('/');
                this.props.showRepositoryByParams(parts[0], parts[1]);
                break;
            }
        }
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
                case 'ForkEvent':
                    iconName = 'git-branch';
                    // because one line event
                    showAvatar = false;
                    content = this.renderForkEvent(event);
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
                            <UIText>{__('EventRow.TypeEventNotSupported', {eventType: event.type})}</UIText>
                        </View>
                    )
            }

            const EventWrapper = isNavigationSupported(event) ? TouchableOpacity : View;

            return (
                <EventWrapper style={styles.event} onPress={() => this.navigateEvent(event)}>
                    <View style={styles.left}>
                        <Icon name={iconName} size={26} />
                        { showAvatar ? <Avatar user={event.actor} size={26} /> : null }
                    </View>
                    {content}
                </EventWrapper>
            )
        } catch (e) {
            captureException(e);

            return (
                <View style={styles.event}>
                    <UIText>{__('EventRow.UnexpectedException', {eventType: event.type })}</UIText>
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
    eventDate: {
        paddingTop: 5,
        fontSize: 13,
        color: '#8e8e8e',
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
        fontSize: normalizeFont(16),
        color: '#0366d6'
    },
    repoName: {
        fontSize: normalizeFont(17),
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
        fontSize: normalizeFont(15),
        fontWeight: 'bold'
    },
});

export default connect(
    null,
    { showRepositoryByParams, showRepositoryCommit }
)(EventRowMobile);
