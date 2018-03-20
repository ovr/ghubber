// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';

import { UIText } from 'components';
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
            { key: 'overview', title: 'Overview' },
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
                    <UIText style={styles.count}>
                        {profile.user.repositories.totalCount}
                    </UIText>
                </View>
            );
        }

        return null;
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return <Profile {...this.props} />;
            case 'repositories':
                return <ProfileRepositories {...this.props} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onIndexChange={this.handleIndexChange}
                useNativeDriver
                {...this.props}
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
            profile: state.profile
        };
    }
)(ProfileScreen);
