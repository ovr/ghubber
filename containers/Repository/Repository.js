// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchRepository } from 'actions';
import { README } from 'components';

// import flow types
import type { RepositoryState } from 'reducers/repository';

type Props = {
    state: RepositoryState,
    fetchRepository: typeof fetchRepository
}

class Repository extends PureComponent<void, Props, void> {
    componentWillMount() {
        const { repository } = this.props.state;

        if (!repository) {
            const { owner, repo } = this.props.navigation.params;

            this.props.fetchRepository(owner, repo);
        }
    }

    render() {
        const { loading, error, repository } = this.props.state;

        if (loading || !repository) {
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
            <View style={styles.root}>
                <ScrollView>
                    <README owner={repository.owner.login} repo={repository.name} />
                </ScrollView>
            </View>
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
            state: state.repository,
            navigation: state.navigation
        }
    },
    { fetchRepository }
)(Repository);
