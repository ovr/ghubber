// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ErrorView, Spinner, Badge, UIText, ReactionGroup, Blank, Comment } from 'components';
import { connect } from 'react-redux';
import { fetchIssue } from 'actions';
import { normalizeFont } from 'utils/helpers';

// import flow types
import type { RepositoryIssueState } from 'reducers/repository-issue';

type Props = {
    state: RepositoryIssueState,
    navigation: {
        params: {
            owner: string,
            repo: string,
            number: number
        }
    },
    fetchIssue: typeof fetchIssue
}

class RepositoryIssueScreen extends PureComponent<Props> {
    componentWillMount() {
        this.fetchIssue();
    }

    fetchIssue() {
        const params = this.props.navigation.params;

        this.props.fetchIssue(
            params.owner,
            params.repo,
            params.number,
        );
    }

    render() {
        const { loading, error, issue } = this.props.state;

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
                        onPress={() => this.fetchIssue()}
                    />
                </View>
            );
        }

        if (!issue) {
            return null;
        }

        return (
            <ScrollView style={styles.root}>
                <View style={styles.header}>
                    <UIText style={styles.title}>{issue.title}</UIText>
                    <View style={styles.issueInfo}>
                        <Badge
                            text={issue.state}
                            backgroundColor={issue.state.toLowerCase() === 'open' ? '#2cbe4e' : '#cb2431'}
                        />
                    </View>
                </View>
                <UIText style={styles.body}>{issue.body}</UIText>
                <ReactionGroup reactions={issue.reactionGroups} />
                <FlatList
                    style={styles.commentsList}
                    data={issue.comments.nodes}
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
    },
    commentsList: {
        flex: 1,
        marginTop: 10
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            state: state.repositoryIssue
        };
    },
    { fetchIssue }
)(RepositoryIssueScreen);
