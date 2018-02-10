// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';

import Realm from 'utils/realm';
import { syncNotifications, trySyncNotifications } from 'actions';
import { NotificationRow, Spinner, FilterTabType, RowSeparator, ErrorView, UIText } from 'components';
import { groupForSectionList } from 'utils/selection-list';
import I18n from 'utils/i18n';

// import flow types
import type { NotificationEntity } from 'github-flow-js';
import type { AccountNotificationsState } from 'reducers/account-notifications';

type Props = {
    state: AccountNotificationsState,
    //
    syncNotifications: typeof syncNotifications,
    trySyncNotifications: typeof trySyncNotifications,
}

type AccountNotificationsComponentState = {
    type: 'unread' | 'participating' | 'all',
    notifications: Array<any>,
}

class AccountNotifications extends PureComponent<Props, AccountNotificationsComponentState> {
    state = {
        type: 'participating',
        notifications: Realm.objects('Notification'),
    };

    componentWillMount() {
        const { trySyncNotifications } = this.props;

        trySyncNotifications();
    }

    selectUnread = () => {
        this.setState({
            type: 'unread'
        });
    }

    selectParticipating = () => {
        this.setState({
            type: 'participating'
        });
    }

    selectAll = () => {
        this.setState({
            type: 'all'
        });
    }

    renderContent() : React.Element<any> {
        const { infinityLoading, loading, error, items } = this.props.state;

        if (loading || items === null) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            const { syncNotifications } = this.props;

            return (
                <View style={styles.container}>
                    <ErrorView
                        error={error}
                        onClick={
                            () => syncNotifications()
                        }
                    />
                </View>
            );
        }

        const { notifications } = this.state;

        if (notifications.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>{I18n.t('AccountNotifications.EmptyResult')}</Text>
                </View>
            );
        }

        const { syncNotifications } = this.props;

        return (
            <SectionList
                style={styles.list}
                sections={groupForSectionList(notifications)}
                renderSectionHeader={({ section }) => (
                    <View style={styles.sectionHeader}>
                        <UIText
                            style={styles.sectionTitle}
                            numberOfLines={1}
                        >
                            {section.title}
                        </UIText>
                    </View>
                )}
                keyExtractor={(entity: NotificationEntity) => entity.id}
                renderItem={
                    ({ item }) => (
                        <NotificationRow
                            notification={item}
                        />
                    )
                }
                ItemSeparatorComponent={RowSeparator}
                refreshing={false}
                ListFooterComponent={() => infinityLoading ? <Spinner style={styles.moreLoadingSpinner} /> : null}
                onRefresh={() => syncNotifications()}
            />
        );
    }

    render() {
        const { type } = this.state;

        return (
            <View style={styles.root}>
                <View style={styles.accountIssuesTypes}>
                    <FilterTabType
                        active={type === 'unread'}
                        onPress={this.selectUnread}
                        title={I18n.t('AccountNotifications.Filter.Unread')}
                    />
                    <FilterTabType
                        active={type === 'participating'}
                        onPress={this.selectParticipating}
                        title={I18n.t('AccountNotifications.Filter.Participating')}
                    />
                    <FilterTabType
                        active={type === 'all'}
                        onPress={this.selectAll}
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
    },
    sectionHeader: {
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#0366d6',
    }
});

export default connect(
    (state: State) => ({
        state: state.accountNotifications
    }),
    { syncNotifications, trySyncNotifications }
)(AccountNotifications);
