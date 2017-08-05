// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ErrorView, Spinner } from 'components';
import { connect } from 'react-redux';
import { fetchCommit } from 'actions';

// import flow types
import type { RepositoryCommitState } from 'reducers/repository-commit';

type Props = {
    state: RepositoryCommitState,
    navigation: {
        params: {
            owner: string,
            repo: string,
            sha: string
        }
    },
    fetchCommit: typeof fetchCommit
}

class CommitScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        const params = this.props.navigation.params;

        this.props.fetchCommit(
            params.owner,
            params.repo,
            params.sha,
        );
    }

    render() {
        const { loading, error, commit } = this.props.state;

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
                    />
                </View>
            )
        }

        if (!commit) {
            return null;
        }

        return (
            <ScrollView>
                <View style={styles.root}>
                    <Text>{commit.commit.message}</Text>
                </View>
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
        flex: 1,
        padding: 10
    },
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            state: state.repositoryCommit
        }
    },
    { fetchCommit }
)(CommitScreen);
