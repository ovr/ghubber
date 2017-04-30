// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchRepositories } from 'actions';

// import flow types
import type { RepositoryEntity } from 'github-flow-js';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';

type Props = {
    state: ProfileRepositoriesState,
    fetchRepositories: typeof fetchRepositories
}

class Repository extends PureComponent<void, Props, void> {
    componentWillMount() {
        this.props.fetchRepositories(this.props.navigation.params.id);
    }

    render() {
        const { loading, error, repositories } = this.props.state;

        if (loading || !repositories) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        if (error) {
            return (
                <View>
                    <Text>Oops! Error...</Text>
                </View>
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
    { fetchRepositories }
)(Repository);
