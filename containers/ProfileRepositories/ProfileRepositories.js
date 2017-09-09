// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { RepositoryRow, RowSeparator } from 'components';
import { fetchRepositories, fetchMoreRepositories, showRepository } from 'actions';

import { Spinner } from 'components';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';

type Props = {
    navigation: {
        params: {
            id: string
        }
    },
    state: ProfileRepositoriesState,
    fetchRepositories: typeof fetchRepositories,
    fetchMoreRepositories: typeof fetchMoreRepositories,
    showRepository: typeof showRepository,
}

class ProfileRepositories extends PureComponent<void> {
    static defaultProps: Props;
    componentWillMount() {
        this.props.fetchRepositories(this.props.navigation.params.id);
    }

    render() {
        const { loading, error, repositories } = this.props.state;

        if (loading || !repositories) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>Oops! Error...</Text>
                </View>
            );
        }

        const { moreLoading, hasMore, page } = this.props.state;
        const { showRepository, fetchMoreRepositories } = this.props;
        const username = this.props.navigation.params.id;

        return (
            <FlatList
                style={styles.list}
                data={repositories}
                keyExtractor={(repository: RepositoryEntity) => repository.id}
                renderItem={
                    ({ item }) => (
                        <RepositoryRow
                            repo={item}
                            onPress={() => showRepository(item)}
                        />
                    )
                }
                refreshing={moreLoading}
                onEndReachedThreshold={0.5}
                onEndReached={moreLoading || !hasMore ? () => null : () => fetchMoreRepositories(username, page + 1)}
                ItemSeparatorComponent={RowSeparator}
                ListFooterComponent={() => moreLoading ? <Spinner style={styles.moreLoadingSpinner} /> : null}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 0,
        marginTop: 5,
        marginHorizontal: 15
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
    (state: State) => {
        return {
            state: state.profileRepositories,
            navigation: state.navigation
        };
    },
    { fetchRepositories, fetchMoreRepositories, showRepository }
)(ProfileRepositories);
