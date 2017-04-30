// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { RepositoryRow } from 'components';
import { fetchRepositories, showRepository } from 'actions';

import { Spinner } from 'components';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';

type Props = {
    state: ProfileRepositoriesState,
    fetchRepositories: typeof fetchRepositories,
    showRepository: typeof showRepository,
}

class ProfileRepositories extends PureComponent<void, Props, void> {
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
            )
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>Oops! Error...</Text>
                </View>
            )
        }

        const { showRepository } = this.props;

        return (
            <FlatList
                style={styles.list}
                data={repositories}
                keyExtractor={(repository: RepositoryEntity) => repository.id}
                renderItem={
                    ({ item }) => (
                        <RepositoryRow
                            repo={item}
                            onPress={() => showRepository(item.owner.login, item.name)}
                        />
                    )
                }
            />
        )
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
    }
});

export default connect(
    (state) => {
        return {
            state: state.profileRepositories,
            navigation: state.navigation
        }
    },
    { fetchRepositories, showRepository }
)(ProfileRepositories);
