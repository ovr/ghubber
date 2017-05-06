// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Avatar, Spinner } from 'components';
import { fetchProfile } from 'actions';

// import flow types
import type { ProfileState } from 'reducers/profile';

type Props = {
    profile: ProfileState,
    fetchProfile: typeof fetchProfile
}

class Profile extends PureComponent<void, Props, void> {
    componentWillMount() {
        this.props.fetchProfile(this.props.navigation.params.id);
    }

    render() {
        const { loading, error, user } = this.props.profile;

        if (loading || !user) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>Oops! Error...</Text>
                </View>
            )
        }

        return (
            <ScrollView style={styles.root}>
                <View style={styles.avatarWrapper}>
                    <Avatar user={user} size={250} />
                </View>
                <View style={styles.statsWrapper}>
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsBlockTitle}>
                            Followers
                        </Text>
                        <Text>
                            {user.followers}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsBlockTitle}>
                            Repos
                        </Text>
                        <Text>
                            {user.public_repos}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsBlockTitle}>
                            Gists
                        </Text>
                        <Text>
                            {user.public_gists}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsBlockTitle}>
                            Following
                        </Text>
                        <Text>
                            {user.following}
                        </Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>
                        { user.name }
                        <Text style={styles.login} numberOfLines={1}> @{ user.login }</Text>
                    </Text>
                    <Text>{ user.email }</Text>
                    <Text style={styles.bio}>{ user.bio }</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        flex: 1,
        padding: 10
    },
    info: {
        flex: 1
    },
    avatarWrapper: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 15,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },
    statsBlock: {
        flex: 0.25
    },
    statsBlockTitle: {
        fontWeight: 'bold'
    },
    name: {
        fontSize: 20
    },
    login: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default connect(
    (state) => {
        return {
            profile: state.profile,
            navigation: state.navigation
        }
    },
    { fetchProfile }
)(Profile);
