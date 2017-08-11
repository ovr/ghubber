// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Badge, UIText } from 'components';
import { showRepositoryIssue, showRepositoryPullRequest } from 'actions';
import moment from 'utils/moment';

// import flow types
import type { IssueEntity } from 'github-flow-js';

type Props = {
    issue: IssueEntity,
    showRepositoryIssue: typeof showRepositoryIssue,
    showRepositoryPullRequest: typeof showRepositoryPullRequest,
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    repositoryName: {
        flex: 0,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#586069',
        marginRight: 5
    },
    title: {
        flex: 0,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        flexDirection: 'row'
    },
    info: {
        marginRight: 5
    },
    labels: {
        flex: 1,
        flexDirection: 'row'
    }
});

const RepositoryUrlPrefixLenght = 'https://api.github.com/repos/'.length;

export class IssueRowMobile extends PureComponent<void, Props, void> {
    onPress = () => {
        const { issue, showRepositoryIssue, showRepositoryPullRequest } = this.props;

        const repositoryName = issue.repository_url.substring(RepositoryUrlPrefixLenght);
        const parts: Array<string> = repositoryName.split('/');

        console.log('onPress');

        if (issue.pull_request) {
            showRepositoryPullRequest(
                parts[0],
                parts[1],
                issue.number
            );
        } else {
            showRepositoryIssue(
                parts[0],
                parts[1],
                issue.number
            );
        }
    };

    render() {
        const { issue } = this.props;

        const repositoryName = issue.repository_url.substring(RepositoryUrlPrefixLenght);

        return (
            <TouchableOpacity style={styles.row} onPress={this.onPress}>
                <UIText style={styles.repositoryName} numberOfLines={1}>
                    {repositoryName}
                </UIText>
                <View style={styles.labels}>
                    {
                        issue.labels && issue.labels.map(
                            (label) => (
                                <Badge
                                    key={label.id}
                                    text={label.name}
                                    backgroundColor={'#' + label.color}
                                />
                            )
                        )
                    }
                </View>
                <UIText style={styles.title} numberOfLines={1}>
                    {issue.title}
                </UIText>
                <View style={styles.footer}>
                    <UIText style={styles.info}>
                        #{issue.number} openeded {moment(issue.created_at).fromNow()} by {issue.user.login}
                    </UIText>
                    {
                        issue.milestone ? (
                            <UIText>
                                {issue.milestone.title}
                            </UIText>
                        ) : null
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

export default connect(
    null,
    { showRepositoryIssue, showRepositoryPullRequest }
)(IssueRowMobile);
