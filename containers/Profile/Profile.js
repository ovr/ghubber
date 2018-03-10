// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Spinner, ErrorView, ProfileView, ProfileOrganizationsView, ContributionsGraph, Blank } from 'components';
import { fetchProfile } from 'actions';

// import flow types
import type { ProfileState } from 'reducers/profile';
import type { NavigationState } from 'reducers/navigation';

type Props = {
    profile: ProfileState,
    navigation: NavigationState,
    fetchProfile: typeof fetchProfile,
}

class Profile extends PureComponent<Props> {
    componentDidMount() {
        this.props.fetchProfile(this.props.navigation.params.id);
    }

    render() {
        const { loading, error, user } = this.props.profile;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <ErrorView
                        onPress={
                            () => this.props.fetchProfile(this.props.navigation.params.id)
                        }
                        error={error}
                        refreshable={true}
                    />
                </View>
            );
        }

        if (!user) {
            return null;
        }

        return (
            <ScrollView style={styles.root}>
                <ProfileView user={user} />
                <ProfileOrganizationsView organizations={user.organizations.nodes} />
                <ContributionsGraph user={user} />
                <Blank />
            </ScrollView>
        );
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
    }
});

export default connect(
    (state) => {
        return {
            profile: state.profile,
            profileOrganizations: state.profileOrganizations,
            navigation: state.navigation
        };
    },
    { fetchProfile }
)(Profile);
