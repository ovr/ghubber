// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { UIText } from 'components';
import { showRepositoryIssue, showRepositoryPullRequest } from 'actions';
import { last } from 'lodash';

// import flow types
import type { NotificationEntity } from 'github-flow-js';

type Props = {
    notification: NotificationEntity,
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
    }
});

export class NotificationRow extends PureComponent<Props> {
    onPress = () => {
        const { notification, showRepositoryIssue, showRepositoryPullRequest } = this.props;

        console.log('onPress', notification.subject.type);

        if (notification.subject.type === 'Issue') {
            const parts: Array<string> = notification.subject.url.split('/');

            showRepositoryIssue(
                notification.repository.owner.login,
                notification.repository.name,
                parseInt(last(parts))
            );
        } else {
            const parts: Array<string> = notification.subject.url.split('/');

            showRepositoryPullRequest(
                notification.repository.owner.login,
                notification.repository.name,
                parseInt(last(parts))
            );
        }
    };

    render() {
        const { notification } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={this.onPress}>
                <UIText style={styles.repositoryName} numberOfLines={1}>
                    {notification.repository.name}
                </UIText>
                <UIText style={styles.title} numberOfLines={1}>
                    {notification.subject.title}
                </UIText>
            </TouchableOpacity>
        );
    }
}

export default connect(
    null,
    { showRepositoryIssue, showRepositoryPullRequest }
)(NotificationRow);
