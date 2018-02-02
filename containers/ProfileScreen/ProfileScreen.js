// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { Profile, ProfileRepositories } from 'containers';

// import flow types
import type { ProfileState } from 'reducers/profile';

type Props = {
    profile: ProfileState
}

type ProfileScreenState = {
    index: number,
    routes: array<Object>,
}

class ProfileScreen extends PureComponent<Props, ProfileScreenState> {
    state = {
        index: 0,
        routes: [
            { key: 'profile', title: 'Overview' },
            { key: 'repositories', title: 'Repositories' },
        ],
    };

    handleIndexChange = index => this.setState({ index });

    renderHeader = props => (
        <TabBar
            {...props}
            style={styles.tabbar}
            tabStyle={styles.tab}
            renderBadge={this.renderBadge}
            useNativeDriver
        />
    );

    renderBadge = ({ route }) => {
        const { profile } = this.props;

        if (route.key === 'repositories' && profile.user) {
            return (
                <View style={styles.badge}>
                    <Text style={styles.count}>
                        {profile.user.repositories.totalCount}
                    </Text>
                </View>
            );
        }

        return null;
    }

    renderScene = SceneMap({
        profile: Profile,
        repositories: ProfileRepositories,
    });

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onIndexChange={this.handleIndexChange}
                useNativeDriver
            />
        );
    }
}

const styles = StyleSheet.create({
    tabbar: {
        backgroundColor: '#222',
    },
    badge: {
        backgroundColor: '#f44336',
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    count: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            profile: state.profile
        };
    }
)(ProfileScreen);
