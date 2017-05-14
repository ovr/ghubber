// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'components';
import { getVersion } from 'react-native-device-info';
import { team, contributors } from 'utils/team';

export default class AboutScreen extends PureComponent<void, void, void> {
    render() {
        const version = getVersion();

        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>GHubber (v{version})</Text>
                </View>
                <View style={styles.team}>
                    <Text style={styles.teamTitle}>Creator</Text>
                    <View>
                        <Avatar user={team[0]} size={250} />
                    </View>
                </View>
                <View style={styles.contributors}>
                    <Text style={styles.contributorsTitle}>Our Awesome Contributors</Text>
                    {
                        contributors.map(
                            (user) => (
                                <Avatar key={user.id} user={user} size={50} />
                            )
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    title: {
        flex: 0,
        fontSize: 28,
        textAlign: 'center'
    },
    contributorsTitle: {
        fontSize: 24
    },
    header: {
        flex: 0,
        alignItems: 'center'
    },
    team: {
        flex: 0,
        alignItems: 'center'
    },
    contributors: {
        flex: 0,
        alignItems: 'center',
        marginVertical: 25
    },
    teamTitle: {
        fontSize: 24
    }
});
