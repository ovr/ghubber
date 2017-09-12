// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchNotifications, fetchMoreNotifications } from 'actions';
import { IssueRow, Spinner, FilterTabType, RowSeparator } from 'components';
import I18n from 'utils/i18n';

// import flow types
import type { NotificationEntity } from 'github-flow-js';
import type { AccountNotificationsState } from 'reducers/account-notifications';

type Props = {
    state: AccountNotificationsState,
    fetchNotifications: typeof fetchNotifications,
    fetchMoreNotifications: typeof fetchMoreNotifications
}

class AccountNotifications extends PureComponent<Props> {
    componentWillMount() {
        const { fetchNotifications } = this.props;

        fetchNotifications('created');
    }

    renderContent() : React.Element<any> {
        const { infinityLoading, type, hasMore, page, loading, error, items } = this.props.state;

        if (loading || items === null) {
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

        if (items.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>{I18n.t('AccountNotifications.EmptyResult')}</Text>
                </View>
            );
        }

        const { fetchNotifications, fetchMoreNotifications } = this.props;

        const isRefreshing = infinityLoading;

        return (
            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={(issue: NotificationEntity) => issue.id}
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
                    () => !isRefreshing && hasMore ? fetchMoreNotifications(page + 1, type) : null
                }
                ListFooterComponent={() => infinityLoading ? <Spinner style={styles.moreLoadingSpinner} /> : null}
                onRefresh={() => fetchNotifications(type)}
            />
        );
    }

    render() {
        const { fetchNotifications, state } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.accountIssuesTypes}>
                    <FilterTabType
                        active={state.type === 'unread'}
                        onPress={() => fetchNotifications('unread')}
                        title={I18n.t('AccountNotifications.Filter.Unread')}
                    />
                    <FilterTabType
                        active={state.type === 'participating'}
                        onPress={() => fetchNotifications('participating')}
                        title={I18n.t('AccountNotifications.Filter.Participating')}
                    />
                    <FilterTabType
                        active={state.type === 'all'}
                        onPress={() => fetchNotifications('all')}
                        title={I18n.t('AccountNotifications.Filter.All')}
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
    (state: State) => ({
        state: state.accountNotifications
    }),
    { fetchNotifications, fetchMoreNotifications }
)(AccountNotifications);
