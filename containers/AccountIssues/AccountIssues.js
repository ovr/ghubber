// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchCreatedIssues } from 'actions';

import { Spinner } from 'components';

// import flow types
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AppState } from 'reducers/app';

type Props = {
    issues: AccountIssuesState,
    app: AppState,
    fetchCreatedIssues: typeof fetchCreatedIssues
}

class AccountIssues extends PureComponent<void, Props, void> {
    componentWillMount() {
        const { app, fetchCreatedIssues } = this.props;

        fetchCreatedIssues(app.user.login);
    }

    render() {
        const { loading, error, issues } = this.props.issues;

        if (loading || !issues) {
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

        return null;
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
    (state) => {
        return {
            issues: state.accountIssues,
            app: state.app
        }
    },
    { fetchCreatedIssues }
)(AccountIssues);
