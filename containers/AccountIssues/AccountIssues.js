// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchCreatedIssues } from 'actions';

import { IssueRow, Spinner } from 'components';

// import flow types
import type { IssueEntity } from 'github-flow-js';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AppState } from 'reducers/app';

type Props = {
    issues: AccountIssuesState,
    app: AppState,
    fetchCreatedIssues: typeof fetchCreatedIssues
}

class AccountIssues extends PureComponent<void, Props, void> {
    componentWillMount() {
        const { app, fetchCreatedIssues } = this.props;

        fetchCreatedIssues(app.user.login);
    }

    render() {
        const { loading, error, issues } = this.props.issues;

        if (issues === null) {
            return null;
        }

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
                    <Text>Oops! Error...</Text>
                </View>
            )
        }

        if (issues.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        You don't have any issues ;)
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.root}>
                <View style={styles.accountIssuesTypes}>
                    <View style={[styles.accountIssuesType, styles.accountIssuesTypeActive]}>
                        <Text style={[styles.accountIssuesTypeText, styles.accountIssuesTypeTextActive]}>Created</Text>
                    </View>
                    <View style={styles.accountIssuesType}>
                        <Text style={styles.accountIssuesTypeText}>Assigned</Text>
                    </View>
                    <View style={styles.accountIssuesType}>
                        <Text style={styles.accountIssuesTypeText}>Mentioned</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.list}
                    data={issues}
                    keyExtractor={(issue: IssueEntity) => issue.id}
                    renderItem={
                        ({ item }) => (
                            <IssueRow
                                issue={item}
                                onPress={() => null}
                            />
                        )
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 15
    },
    accountIssuesTypes: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
    },
    accountIssuesTypeActive: {
        backgroundColor: '#0366d6',
        borderColor: '#0366d6'
    },
    accountIssuesType: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#e1e4e8'
    },
    accountIssuesTypeTextActive: {
        color: '#fff',
    },
    accountIssuesTypeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#586069'
    },
    list: {
        flex: 0,
        marginTop: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    moreLoadingSpinner: {
        marginVertical: 15
    }
});

export default connect(
    (state) => {
        return {
            issues: state.accountIssues,
            app: state.app
        }
    },
    { fetchCreatedIssues }
)(AccountIssues);
