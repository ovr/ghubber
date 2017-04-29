// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            <View style={{ flex: 1 }}>
                <View style={styles.root}>
                    <View style={styles.avatarWrapper}>
                        <Avatar user={user} size={250}/>
                    </View>
                    <View style={styles.root}>
                        <Text style={styles.name} numberOfLines={1}>{ user.name }</Text>
                        <Text style={styles.login} numberOfLines={1}>{ user.login }</Text>
                        <Text>{ user.bio }</Text>
                        <Text>{ user.email }</Text>
                    </View>
                </View>
            </View>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
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
