// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ErrorView, Spinner, Badge, UIText, ReactionGroup, Blank, Comment, CommitRow, RowSeparator } from 'components';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import { fetchPullRequest } from 'actions';
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
    fetchPullRequest: typeof fetchPullRequest
}

const TITLE_COMMITS_INDEX = 1;

class RepositoryPullRequestScreen extends PureComponent<void, Props, void> {
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

    renderTitle = (index: number, title: string): React.Element<any> => {
        const { pullRequest } = this.props.state;

        if (index === TITLE_COMMITS_INDEX && pullRequest) {
            return (
                <View style={styles.pageTitleWrapper}>
                    <UIText>
                        Commits
                    </UIText>
                    <UIText style={styles.badge}>
                        {pullRequest.commits.nodes.length}
                    </UIText>
                </View>
            )
        }

        return (
            <UIText>
                {title}
            </UIText>
        )
    };

    getTitles() {
        const { pullRequest } = this.props.state;

        return [
            'Overview',
            // Upd title on loading
            pullRequest ? `${pullRequest.commits.nodes.length}` : '0'
        ];
    }

    renderOverView(pullRequest: Object): React.Element<any> {
        return (
            <ScrollView style={styles.overview}>
                <View style={styles.header}>
                    <UIText style={styles.title}>{pullRequest.title}</UIText>
                    <View style={styles.issueInfo}>
                        <Badge
                            text={pullRequest.state}
                            backgroundColor={pullRequest.state.toLowerCase() === 'open' ? '#2cbe4e' : '#cb2431'}
                        />
                    </View>
                </View>
                <UIText style={styles.body}>{pullRequest.body}</UIText>
                <ReactionGroup reactions={pullRequest.reactionGroups} />
                <FlatList
                    style={{ flex: 1 }}
                    data={pullRequest.comments.nodes}
                    keyExtractor={(comment: Object) => comment.id}
                    renderItem={
                        ({ item }) => (
                            <Comment
                                key={"comment" + item.id}
                                comment={item}
                            />
                        )
                    }
                    refreshing={false}
                />
                <Blank />
            </ScrollView>
        )
    }

    renderCommits(pullRequest: Object): React.Element<any> {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    style={styles.wrapper}
                    data={pullRequest.commits.nodes}
                    keyExtractor={(repository: Object) => repository.id}
                    renderItem={
                        ({ item }) => (
                            <CommitRow
                                key={"commit" + item.commit.id}
                                commit={item.commit}
                            />
                        )
                    }
                    ItemSeparatorComponent={RowSeparator}
                    refreshing={false}
                />
                <Blank />
            </View>
        )
    }

    render() {
        const { loading, error, pullRequest } = this.props.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
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
            )
        }

        if (!pullRequest) {
            return null;
        }

        return (
            <IndicatorViewPager
                style={styles.viewPager}
                indicator={
                    <PagerTitleIndicator
                        titles={this.getTitles()}
                        renderTitle={this.renderTitle}
                    />
                }
            >
                <View style={styles.page}>
                    {this.renderOverView(pullRequest)}
                </View>
                <View style={styles.page}>
                    {this.renderCommits(pullRequest)}
                </View>
            </IndicatorViewPager>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewPager: {
        flex: 1,
        flexDirection: 'column-reverse',
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
    pageTitleWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        fontSize: 12,
        marginLeft: 10,
        backgroundColor: '#3498db',
        color: '#fff',
        paddingVertical: 3,
        paddingHorizontal: 5
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            state: state.repositoryPullRequest
        }
    },
    { fetchPullRequest }
)(RepositoryPullRequestScreen);
