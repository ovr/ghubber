// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ErrorView, Spinner, Badge, UIText, ReactionGroup, Blank } from 'components';
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
            )
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
            )
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
        flex: 1,
        padding: 10
    },
    header: {
        flex: 1,
    },
    issueInfo: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    title: {
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
        flex: 1
    },
    body: {
        fontSize: normalizeFont(14)
    }
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
