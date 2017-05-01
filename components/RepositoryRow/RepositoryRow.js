// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

type Props = {
    repo: RepositoryEntity,
};

const styles = StyleSheet.create({
    row: {
        flex: 1
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center',
    },
    forkBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: 'yellow'
    }
});

const ForkBadge = <View style={styles.forkBadge}><Text>Fork</Text></View>;

export default class RepositoryRow extends PureComponent<void, Props, void> {
    render() {
        const { repo, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    {repo.fork ? ForkBadge : null}
                    <Text style={styles.name} numberOfLines={1}>
                        {repo.name}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>{repo.stargazers_count}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
