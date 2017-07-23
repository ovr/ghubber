// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';

type Props = {
    repo: RepositoryEntity,
    onPress?: () => any
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
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
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
    },
    counter: {
        marginRight: 10
    },
    counterIcon: {
        paddingRight: 5
    },
    languageCounter: {
        color: 'red'
    }
});

const ForkBadge = <View style={styles.forkBadge}><Text>Fork</Text></View>;

export default class RepositoryRow extends PureComponent<void, Props, void> {
    render() {
        const { repo, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <View style={styles.header}>
                    {repo.fork ? ForkBadge : null}
                    <Text style={styles.name} numberOfLines={1}>
                        {repo.name}
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.counter}>
                        <Icon name="star" size={15} color="black" style={styles.counterIcon} />
                        {" Stars: "}
                        {repo.stargazers_count}
                    </Text>
                    <Text style={styles.counter}>
                        <Icon name="eye" size={15} color="black" style={styles.counterIcon} />
                        {" Watchers: "}
                        {repo.watchers_count}
                    </Text>
                    <Text style={styles.counter}>
                        <Entypo name="flow-branch" size={15} color="black" style={styles.counterIcon} />
                        {"Forks: "}
                        {repo.forks_count}
                    </Text>
                    <Text style={[styles.counter, styles.languageCounter]}>
                        {repo.language}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
