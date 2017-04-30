// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
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

        const renderRow = (repository: RepositoryEntity) => {
            return (
                <TouchableOpacity style={styles.row} onPress={() => showRepository(repository.owner.login, repository.name)}>
                    <Text style={styles.name} numberOfLines={1}>{repository.name}</Text>
                    <View style={{ flex: 1 }}>
                        <Text>{repository.stargazers_count}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <FlatList
                style={styles.list}
                data={repositories}
                keyExtractor={(repository: RepositoryEntity) => repository.id}
                renderItem={({ item }) => renderRow(item)}
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
    },
    row: {
        flex: 1
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
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
