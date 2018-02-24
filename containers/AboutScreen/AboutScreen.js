// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'components';
import { getVersion } from 'react-native-device-info';
import contributors  from 'res/contributors.json';
import { showProfile } from 'actions';

type Props = {
    showProfile: typeof showProfile,
}

class AboutScreen extends PureComponent<Props> {
    render() {
        const { showProfile } = this.props;

        const version = getVersion();

        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Text style={styles.title}>GHubber (v{version})</Text>
                </View>
                <View style={styles.contributors}>
                    <Text style={styles.contributorsTitle}>Our Awesome Contributors</Text>
                    <View style={styles.contributorsRow}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
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
        marginVertical: 15,
        flex: 0,
        alignItems: 'center'
    },
    contributors: {
        flex: 0,
        alignItems: 'center',
        marginVertical: 25
    },
    contributorsRow: {
        flex: 1,
        flexDirection: 'row'
    },
});

export default connect(
    null,
    { showProfile }
)(AboutScreen);
