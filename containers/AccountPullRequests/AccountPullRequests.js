// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchPullRequests, fetchMorePullRequests } from 'actions';
import { IssueRow, Spinner, FilterTabType, RowSeparator } from 'components';
import I18n from 'utils/i18n';

// import flow types
import type { IssueEntity } from 'github-flow-js';
import type { AccountPullRequestsState } from 'reducers/account-pull-requests';
import type { AppState } from 'reducers/app';

type Props = {
    pullRequests: AccountPullRequestsState,
    app: AppState,
    fetchPullRequests: typeof fetchPullRequests,
    fetchMorePullRequests: typeof fetchMorePullRequests
}

class AccountPullRequests extends PureComponent<void> {
    static defaultProps: Props;
    componentWillMount() {
        const { app, fetchPullRequests } = this.props;

        fetchPullRequests(app.user.login, 'created');
    }

    renderContent() : React.Element<any> {
        const { infinityLoading, type, hasMore, page, loading, error, pullRequests } = this.props.pullRequests;

        if (loading || pullRequests === null) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>{I18n.t('AccountPullRequests.Error')}</Text>
                </View>
            );
        }

        if (pullRequests.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        {I18n.t('AccountPullRequests.EmptyResult')}
                    </Text>
                </View>
            );
        }

        const { app } = this.props;

        const isRefreshing = infinityLoading;

        return (
            <FlatList
                style={styles.list}
                data={pullRequests}
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
                    () => !isRefreshing && hasMore ? fetchMorePullRequests(app.user.login, page + 1, type) : null
                }
                ListFooterComponent={() => infinityLoading ? <Spinner style={styles.moreLoadingSpinner} /> : null}
            />
        );
    }

    render() {
        const { app, fetchPullRequests, pullRequests } = this.props;
        const { type } = pullRequests;

        return (
            <View style={styles.root}>
                <View style={styles.accountPullRequestsTypes}>
                    <FilterTabType
                        active={type === 'created'}
                        onPress={() => fetchPullRequests(app.user.login, 'created')}
                        title={I18n.t('AccountPullRequests.Filter.Created')}
                    />
                    <FilterTabType
                        active={type === 'assigned'}
                        onPress={() => fetchPullRequests(app.user.login, 'assigned')}
                        title={I18n.t('AccountPullRequests.Filter.Assigned')}
                    />
                    <FilterTabType
                        active={type === 'mentioned'}
                        onPress={() => fetchPullRequests(app.user.login, 'mentioned')}
                        title={I18n.t('AccountPullRequests.Filter.Mentioned')}
                    />
                    <FilterTabType
                        active={type === 'review-requested'}
                        onPress={() => fetchPullRequests(app.user.login, 'review-requested')}
                        title={I18n.t('AccountPullRequests.Filter.ReviewRequested')}
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
        marginHorizontal: 15
    },
    accountPullRequestsTypes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
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
            pullRequests: state.accountPullRequests,
            app: state.app
        };
    },
    { fetchPullRequests, fetchMorePullRequests }
)(AccountPullRequests);
