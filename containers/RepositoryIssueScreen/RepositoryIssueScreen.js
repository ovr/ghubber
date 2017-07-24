// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ErrorView, Spinner } from 'components';
import { connect } from 'react-redux';
import { fetchIssue } from 'actions';

// import flow types
import type { RepositoryIssueState } from 'reducers/repository-issue';

type Props = {
    state: RepositoryIssueState,
    navigation: {
        params: {
            owner: string,
            repo: string,
            id: number
        }
    },
    fetchIssue: typeof fetchIssue
}

class RepositoryIssueScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        const params = this.props.navigation.params;

        console.log(params);

        this.props.fetchIssue(
            params.owner,
            params.repo,
            params.id,
        );
    }

    render() {
        const { loading, error, issue } = this.props.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        console.log(error);

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

        if (!issue) {
            return null;
        }

        return (
            <View>
                <Text>Text</Text>
            </View>
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
            state: state.repositoryIssue
        }
    },
    { fetchIssue }
)(RepositoryIssueScreen);
