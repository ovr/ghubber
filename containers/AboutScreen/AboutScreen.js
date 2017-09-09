// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'components';
import { getVersion } from 'react-native-device-info';
import { team, contributors } from 'utils/team';
import { showProfile } from 'actions';

type Props = {
    showProfile: typeof showProfile,
}

class AboutScreen extends PureComponent<void> {
    static defaultProps: Props;
    render() {
        const { showProfile } = this.props;

        const version = getVersion();

        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>GHubber (v{version})</Text>
                </View>
                <View style={styles.team}>
                    <Text style={styles.teamTitle}>Creator</Text>
                    <TouchableOpacity onPress={() => showProfile(team[0].login)} style={styles.member}>
                        <Avatar user={team[0]} size={250} />
                        <Text style={styles.teamMemberName}>{team[0].name}@{team[0].login}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contributors}>
                    <Text style={styles.contributorsTitle}>Our Awesome Contributors</Text>
                    {
                        contributors.map(
                            (user) => (
                                <TouchableOpacity onPress={() => showProfile(user.login)} key={user.id}>
                                    <Avatar user={user} size={50} />
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
            </View>
        );
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
    },
    teamMemberName: {
        fontSize: 20,
        textAlign: 'center'
    },
});

export default connect(
    null,
    { showProfile }
)(AboutScreen);
