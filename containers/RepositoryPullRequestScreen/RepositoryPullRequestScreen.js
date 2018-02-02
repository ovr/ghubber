// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { ErrorView, Spinner, Badge, UIText, ReactionGroup, Blank, Comment, CommitRow, RowSeparator } from 'components';
import { fetchPullRequest, showRepositoryCommit } from 'actions';
import { normalizeFont } from 'utils/helpers';

// import flow types
import type { RepositoryPullRequestState } from 'reducers/repository-pull-request';

type Props = {
    state: RepositoryPullRequestState,
    navigation: {
        params: {
            owner: string,
            repo: string,
            number: number
        }
    },
    fetchPullRequest: typeof fetchPullRequest,
    showRepositoryCommit: typeof showRepositoryCommit,
}

type RepositoryPullRequestScreenState = {
    index: number,
    routes: Array<Object>
}

function getStateColor(state: string): string {
    switch (state.toLowerCase()) {
        case 'open':
            return '#2cbe4e';
        case 'merged':
            return '#6f42c1';
        case 'closed':
            return '#cb2431';
        default:
            throw new Error(`Unknown state: ${state}`);
    }
}

class RepositoryPullRequestScreen extends PureComponent<Props, RepositoryPullRequestScreenState> {
    state = {
        index: 0,
        routes: [
            { key: 'overview', title: 'Overview' },
            { key: 'commits', title: 'Commits' },
        ],
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return this.renderOverView(this.props.state.pullRequest);
            case 'commits':
                return this.renderCommits(this.props.state.pullRequest);
            default:
                return null;
        }
    }

    handleIndexChange = index => this.setState({ index });

    renderHeader = props => (
        <TabBar
            {...props}
            style={styles.tabbar}
            tabStyle={styles.tab}
            renderBadge={this.renderBadge}
        />
    );

    renderBadge = ({ route }) => {
        const { pullRequest } = this.props.state;

        if (route.key === 'commits' && pullRequest) {
            return (
                <View style={styles.badge}>
                    <UIText style={styles.count}>
                        {pullRequest.commits.nodes.length}
                    </UIText>
                </View>
            );
        }

        return null;
    }

    componentWillMount() {
        this.fetchPullRequest();
    }

    fetchPullRequest() {
        const params = this.props.navigation.params;

        this.props.fetchPullRequest(
            params.owner,
            params.repo,
            params.number,
        );
    }

    renderOverView = (pullRequest: Object): React.Element<any> => {
        return (
            <View style={styles.page}>
                <ScrollView style={styles.overview}>
                    <View style={styles.header}>
                        <UIText style={styles.title}>{pullRequest.title}</UIText>
                        <View style={styles.issueInfo}>
                            <Badge
                                text={pullRequest.state}
                                backgroundColor={getStateColor(pullRequest.state)}
                            />
                        </View>
                    </View>
                    <UIText style={styles.body}>{pullRequest.body}</UIText>
                    <ReactionGroup reactions={pullRequest.reactionGroups} />
                    <FlatList
                        style={styles.commentsList}
                        data={pullRequest.comments.nodes}
                        keyExtractor={(comment: Object) => comment.id}
                        renderItem={
                            ({ item }) => (
                                <Comment
                                    key={'comment' + item.id}
                                    comment={item}
                                />
                            )
                        }
                        refreshing={false}
                    />
                    <Blank />
                </ScrollView>
            </View>
        );
    }

    onCommitPress = (item: Object) => {
        const params = this.props.navigation.params;

        this.props.showRepositoryCommit(
            params.owner,
            params.repo,
            item.oid,
        );
    };

    renderCommits = (pullRequest: Object): React.Element<any> => {
        return (
            <View style={styles.page}>
                <FlatList
                    style={styles.wrapper}
                    data={pullRequest.commits.nodes}
                    keyExtractor={(repository: Object) => repository.id}
                    renderItem={
                        ({ item }) => (
                            <CommitRow
                                key={'commit' + item.commit.id}
                                commit={item.commit}
                                onPress={() => this.onCommitPress(item.commit)}
                            />
                        )
                    }
                    ItemSeparatorComponent={RowSeparator}
                    refreshing={false}
                />
            </View>
        );
    }

    render() {
        const { loading, error, pullRequest } = this.props.state;

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
                        error={error}
                        refreshable={true}
                        onPress={() => this.fetchPullRequest()}
                    />
                </View>
            );
        }

        if (!pullRequest) {
            return null;
        }

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    page: {
        flex: 1,
        paddingHorizontal: 10
    },
    wrapper: {
        flex: 1
    },
    overview: {
        flex: 0,
        paddingTop: 10
    },
    issueInfo: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    header: {
    },
    title: {
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
    },
    body: {
        fontSize: normalizeFont(14)
    },
    commentsList: {
        flex: 1,
        marginTop: 10
    },
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
            state: state.repositoryPullRequest
        };
    },
    { fetchPullRequest, showRepositoryCommit }
)(RepositoryPullRequestScreen);
