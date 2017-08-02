// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UIText, Badge } from 'components';
import moment from 'utils/moment';

// import flow types
import type { IssueEntity } from 'github-flow-js';

type Props = {
    issue: IssueEntity,
    onPress: () => any
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    header: {
        flex: 1,
        flexDirection: 'row'
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
        flexDirection: 'row',
    }
});

const RepositoryUrlPrefixLenght = 'https://api.github.com/repos/'.length;

export default class IssueRowTablet extends PureComponent<void, Props, void> {
    render() {
        const { issue, onPress } = this.props;

        const repositoryName = issue.repository_url.substring(RepositoryUrlPrefixLenght);

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <View style={styles.header}>
                    <UIText style={styles.repositoryName}>
                        {repositoryName}
                    </UIText>
                    <UIText style={styles.title} numberOfLines={1}>
                        {issue.title}
                    </UIText>
                </View>
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
        )
    }
}
