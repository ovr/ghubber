// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

// import flow types
import type { IssueEntity } from 'github-flow-js';

type Props = {
    issue: IssueEntity,
    onPress: () => void
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

const ForkBadge = <View style={styles.forkBadge}><Text>Fork</Text></View>;

export default class RepositoryRow extends PureComponent<void, Props, void> {
    render() {
        const { issue, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {issue.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
