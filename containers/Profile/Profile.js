// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'components';
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
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        if (error) {
            return (
                <View>
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
                        <Text>
                            Followers
                        </Text>
                        <Text>
                            {user.followers}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text>
                            Public Repos
                        </Text>
                        <Text>
                            {user.public_repos}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text>
                            Public Gists
                        </Text>
                        <Text>
                            {user.public_gists}
                        </Text>
                    </View>
                    <View style={styles.statsBlock}>
                        <Text>
                            Following
                        </Text>
                        <Text>
                            {user.following}
                        </Text>
                    </View>
                </View>
                <View style={styles.root}>
                    <Text style={styles.name} numberOfLines={1}>{ user.name }</Text>
                    <Text style={styles.login} numberOfLines={1}>{ user.login }</Text>
                    <Text>{ user.bio }</Text>
                    <Text>{ user.email }</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    root: {
        flex: 1,
        padding: 10
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
        height: 50
    },
    statsBlock: {
        flex: 0.25
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
