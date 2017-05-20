// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchIssues } from 'actions';

import { IssueRow, Spinner } from 'components';

// import flow types
import type { IssueEntity } from 'github-flow-js';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AppState } from 'reducers/app';

type Props = {
    issues: AccountIssuesState,
    app: AppState,
    fetchIssues: typeof fetchIssues
}

class AccountIssues extends PureComponent<void, Props, void> {
    componentWillMount() {
        const { issues, app, fetchIssues } = this.props;

        fetchIssues(app.user.login, 'created');
    }

    renderContent() : React.Element<any> {
        const { loading, error, issues } = this.props.issues;

        if (loading || issues === null) {
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
        );
    }

    render() {
        const { app, fetchIssues, issues } = this.props;
        const { type } = issues;

        return (
            <View style={styles.root}>
                <View style={styles.accountIssuesTypes}>
                    {
                        type === 'created' ? (
                            <View style={[styles.accountIssuesType, styles.accountIssuesTypeActive]}>
                                <Text style={[styles.accountIssuesTypeText, styles.accountIssuesTypeTextActive]}>Created</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.accountIssuesType}
                                onPress={() => fetchIssues(app.user.login, 'created')}
                            >
                                <Text style={styles.accountIssuesTypeText}>Created</Text>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        style={styles.accountIssuesType}
                        onPress={() => fetchIssues(app.user.login, 'assigned')}
                    >
                        <Text style={styles.accountIssuesTypeText}>Assigned</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.accountIssuesType}
                        onPress={() => fetchIssues(app.user.login, 'mentioned')}
                    >
                        <Text style={styles.accountIssuesTypeText}>Mentioned</Text>
                    </TouchableOpacity>
                </View>
                {this.renderContent()}
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
    { fetchIssues }
)(AccountIssues);
