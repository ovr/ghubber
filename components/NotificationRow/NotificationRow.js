// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { UIText } from 'components';
import { showRepositoryIssue, showRepositoryPullRequest } from 'actions';
import { last } from 'lodash';

import moment from 'utils/moment';
import Icon from 'react-native-vector-icons/Octicons';

// import flow types
import type { NotificationEntity } from 'github-flow-js';

type Props = {
    notification: NotificationEntity,
    showRepositoryIssue: typeof showRepositoryIssue,
    showRepositoryPullRequest: typeof showRepositoryPullRequest,
};

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

    getIconName = () => {
        const { notification } = this.props;

        if (notification.subject.type === 'Issue') {
            return 'issue-opened';
        } else {
            return 'git-pull-request';
        }
    };

    render() {
        const { notification } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={this.onPress}>
                <View style={styles.left}>
                    <Icon
                        name={this.getIconName()}
                        size={24}
                    />
                </View>
                <View style={styles.right}>
                    <UIText style={styles.title} numberOfLines={1}>
                        {notification.subject.title}
                    </UIText>
                    <UIText style={styles.updatedAt} numberOfLines={1}>
                        {moment(notification.updated_at).fromNow()}
                    </UIText>
                </View>
            </TouchableOpacity>
        );
    }
}

export default connect(
    null,
    { showRepositoryIssue, showRepositoryPullRequest }
)(NotificationRow);

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    left: {
        flex: 0,
        flexDirection: 'row',
        paddingRight: 4,
        alignItems: 'center'
    },
    right: {
        flex: 1,
    },
    title: {
        flex: 0,
        fontSize: 16,
        fontWeight: 'bold',
    },
    updatedAt: {
        flex: 0,
        fontSize: 14,
        color: '#586069',
    },
});
