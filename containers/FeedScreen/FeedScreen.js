// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, EventRow } from 'components';
import { fetchAccountFeed } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';

type Props = {
    feed: AccountFeedState,
    fetchAccountFeed: typeof fetchAccountFeed
}

class FeedScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        this.props.fetchAccountFeed();
    }

    render() {
        const { loading, infinityLoading, error, events } = this.props.feed;

        if (loading || !events) {
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

        return (
            <FlatList
                style={styles.list}
                data={events}
                keyExtractor={(repository) => repository.id}
                refreshing={loading || infinityLoading}
                renderItem={
                    ({ item }) => (
                        <EventRow
                            event={item}
                            onPress={() => null}
                        />
                    )
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        flex: 0,
        marginTop: 5,
        marginHorizontal: 15
    }
})

export default connect(
    (state) => ({
        feed: state.accountFeed
    }),
    { fetchAccountFeed }
)(FeedScreen);
