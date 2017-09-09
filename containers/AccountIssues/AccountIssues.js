// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchIssues, fetchMoreIssues } from 'actions';
import { IssueRow, Spinner, FilterTabType, RowSeparator } from 'components';
import I18n from 'utils/i18n';

// import flow types
import type { IssueEntity } from 'github-flow-js';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AppState } from 'reducers/app';

type Props = {
    issues: AccountIssuesState,
    app: AppState,
    fetchIssues: typeof fetchIssues,
    fetchMoreIssues: typeof fetchMoreIssues
}

class AccountIssues extends PureComponent<Props> {
    componentWillMount() {
        const { app, fetchIssues } = this.props;

        fetchIssues(app.user.login, 'created');
    }

    renderContent() : React.Element<any> {
        const { infinityLoading, type, hasMore, page, loading, error, issues } = this.props.issues;

        if (loading || issues === null) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>{I18n.t('AccountIssues.Error')}</Text>
                </View>
            );
        }

        if (issues.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>{I18n.t('AccountIssues.EmptyResult')}</Text>
                </View>
            );
        }

        const { fetchIssues, fetchMoreIssues, app } = this.props;

        const isRefreshing = infinityLoading;

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
                ItemSeparatorComponent={RowSeparator}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.5}
                onEndReached={
                    () => !isRefreshing && hasMore ? fetchMoreIssues(app.user.login, page + 1, type) : null
                }
                ListFooterComponent={() => infinityLoading ? <Spinner style={styles.moreLoadingSpinner} /> : null}
                onRefresh={() => fetchIssues(app.user.login, type)}
            />
        );
    }

    render() {
        const { app, fetchIssues, issues } = this.props;
        const { type } = issues;

        return (
            <View style={styles.root}>
                <View style={styles.accountIssuesTypes}>
                    <FilterTabType
                        active={type === 'created'}
                        onPress={() => fetchIssues(app.user.login, 'created')}
                        title={I18n.t('AccountIssues.Filter.Created')}
                    />
                    <FilterTabType
                        active={type === 'assigned'}
                        onPress={() => fetchIssues(app.user.login, 'assigned')}
                        title={I18n.t('AccountIssues.Filter.Assigned')}
                    />
                    <FilterTabType
                        active={type === 'mentioned'}
                        onPress={() => fetchIssues(app.user.login, 'mentioned')}
                        title={I18n.t('AccountIssues.Filter.Mentioned')}
                    />
                </View>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 15,
    },
    accountIssuesTypes: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10,
    },
    list: {
        flex: 0,
        marginTop: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreLoadingSpinner: {
        marginVertical: 15,
    }
});

export default connect(
    (state) => {
        return {
            issues: state.accountIssues,
            app: state.app
        };
    },
    { fetchIssues, fetchMoreIssues }
)(AccountIssues);
