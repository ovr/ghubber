// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
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
            <View>
                <Text>{ user.login }</Text>
                <Text>{ user.bio }</Text>
                <Text>{ user.email }</Text>
            </View>
        )
    }
}

export default connect(
    (state) => {
        return {
            profile: state.profile,
            navigation: state.navigation
        }
    },
    { fetchProfile }
)(Profile);
