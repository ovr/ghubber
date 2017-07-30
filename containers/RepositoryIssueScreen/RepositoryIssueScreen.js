// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ErrorView, Spinner, Badge } from 'components';
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

class RepositoryIssueScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        const params = this.props.navigation.params;

        console.log(params);

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

        console.log(issue);
        console.log(issue.state);

        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Text style={styles.title}>{issue.title}</Text>
                    <View style={styles.issueInfo}>
                        <Badge
                            text={issue.state}
                            backgroundColor={issue.state == 'open' ? '#2cbe4e' : '#cb2431'}
                        />
                    </View>
                </View>
                <Text style={styles.body}>{issue.body}</Text>
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
    header: {
        flex: 1,
    },
    issueInfo: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        marginVertical: 10,
        backgroundColor: 'red'
    },
    title: {
        fontSize: normalizeFont(18),
        fontWeight: 'bold'
    },
    body: {
        fontSize: normalizeFont(14)
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
