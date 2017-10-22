// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ErrorView, Spinner, UIText, DiffBlock, Avatar } from 'components';
import { connect } from 'react-redux';
import { fetchCommit, showProfile } from 'actions';
import { __ } from 'utils/i18n';

// import flow types
import type { RepositoryCommitState } from 'reducers/repository-commit';

type Props = {
    state: RepositoryCommitState,
    navigation: {
        params: {
            owner: string,
            repo: string,
            sha: string
        }
    },
    fetchCommit: typeof fetchCommit,
    showProfile: typeof showProfile
}

class CommitScreen extends PureComponent<Props> {
    componentWillMount() {
        const params = this.props.navigation.params;

        this.props.fetchCommit(
            params.owner,
            params.repo,
            params.sha,
        );
    }

    renderFile = ({ item }) => <DiffBlock file={item} style={styles.diffBlock} />;

    pressOnCommitter = () => {
        const { commit } = this.props.state;
        const { showProfile } = this.props;

        if (commit) {
            if (commit.committer) {
                showProfile(commit.committer.login);
            } else {
                Alert.alert(
                    __('CommitScreen.Error.NoCommitter'),
                    null,
                    [
                        {
                            text: 'Ok'
                        }
                    ],
                    { cancelable: false }
                );
            }
        }
    };

    render() {
        const { loading, error, commit } = this.props.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <ErrorView
                        error={error}
                        refreshable={true}
                    />
                </View>
            );
        }

        if (!commit) {
            return null;
        }

        return (
            <ScrollView>
                <View style={styles.overviewBox}>
                    <View style={styles.messageBox}>
                        <UIText>{commit.commit.message}</UIText>
                    </View>
                    <TouchableOpacity
                        style={styles.commitInfoBox}
                        onPress={this.pressOnCommitter}
                    >
                        {
                            commit.committer ? (
                                <Avatar user={commit.committer} size={25} style={styles.avatar} />
                            ) : null
                        }
                        <UIText style={styles.commiter}>
                            {commit.committer ? commit.committer.login : commit.commit.committer.name}
                        </UIText>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={commit.files}
                    keyExtractor={(file: Object) => file.sha}
                    renderItem={this.renderFile}
                    refreshing={false}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overviewBox: {
        flex: 0,
        margin: 6,
        borderWidth: 1,
        borderColor: 'rgba(27,31,35,0.15)'
    },
    messageBox: {
        padding: 10,
        backgroundColor: '#eaf5ff',
        borderBottomWidth: 1,
        borderColor: 'rgba(27,31,35,0.15)',
    },
    diffBlock: {
        flex: 1,
        marginBottom: 10
    },
    commitInfoBox: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    avatar: {
        flex: 0,
        flexDirection: 'row',
        marginRight: 5
    },
    commiter: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            state: state.repositoryCommit
        };
    },
    { fetchCommit, showProfile }
)(CommitScreen);
