// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';

import { UIText } from 'components';
import { Repository } from 'containers';

type Props = {
}

type RepositoryScreenState = {
    index: number,
    routes: Array<Object>
}

const Commits = () => (
    <View>
        <UIText>Sorry, We are working on this scene</UIText>
    </View>
);

class RepositoryScreen extends PureComponent<Props, RepositoryScreenState> {
    state = {
        index: 0,
        routes: [
            { key: 'overview', title: 'Overview' },
            { key: 'commits', title: 'Commits' },
        ],
    };

    handleIndexChange = index => this.setState({ index });

    renderHeader = props => (
        <TabBar
            {...props}
            style={styles.tabbar}
            tabStyle={styles.tab}
            useNativeDriver
        />
    );

    renderScene = SceneMap({
        overview: Repository,
        commits: Commits,
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
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation
        };
    }
)(RepositoryScreen);
