// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

type Props = {
    repo: RepositoryEntity,
};

export default class RepositoryRow extends PureComponent<void, Props, void> {
    render() {
        const { repo, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <Text style={styles.name} numberOfLines={1}>{repo.name}</Text>
                <View style={{ flex: 1 }}>
                    <Text>{repo.stargazers_count}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    }
});
