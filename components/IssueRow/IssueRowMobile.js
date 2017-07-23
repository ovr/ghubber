// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Text } from 'components';

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
    labels: {
        flex: 1,
        flexDirection: 'row'
    }
});

const RepositoryUrlPrefixLenght = 'https://api.github.com/repos/'.length;

export default class IssueRowMobile extends PureComponent<void, Props, void> {
    render() {
        const { issue, onPress } = this.props;

        const repositoryName = issue.repository_url.substring(RepositoryUrlPrefixLenght);

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <Text style={styles.repositoryName} numberOfLines={1}>
                    {repositoryName}
                </Text>
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
                <Text style={styles.title} numberOfLines={1}>
                    {issue.title}
                </Text>
            </TouchableOpacity>
        )
    }
}
