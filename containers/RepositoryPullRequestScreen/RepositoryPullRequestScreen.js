// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ErrorView, Spinner, Badge, UIText, ReactionGroup, Blank, Comment } from 'components';
import { connect } from 'react-redux';
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

        console.log(pullRequest);

        if (!pullRequest) {
            return null;
        }

        return (
            <ScrollView style={styles.root}>
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
                    keyExtractor={(repository: Object) => repository.id}
                    renderItem={
                        ({ item }) => (
                            <Comment
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        flex: 0,
        padding: 10
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
