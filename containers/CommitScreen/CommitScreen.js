// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ErrorView, Spinner, UIText } from 'components';
import { connect } from 'react-redux';
import { fetchCommit } from 'actions';

type LineDiff = {
    type: 'delete' | 'add' | 'normal',
    text: string,
}

type Patch = {
    oldStart: number,
    oldLines: number,
    newStart: number,
    newLines: number,
    diff: Array<LineDiff>
}

function parse(input: string): Patch {
    const lines: Array<string> = input.split('\n');

    const chunkLine: string = lines[0];
    let chunkInfo: Array<string>|null = chunkLine.match(/^@@\s+-(\d+),?(\d+)?\s+\+(\d+),?(\d+)?\s@@/);

    lines.splice(0, 1);

    let result: Patch = {
        oldStart: +chunkInfo[1],
        oldLines: +(chunkInfo[2] || 0),
        newStart: +chunkInfo[3],
        newLines: +(chunkInfo[4] || 0),
        diff: []
    };

    for (let line of lines) {
        switch (line[0]) {
            case '-':
                result.diff.push({
                    type: 'delete',
                    text: line.substr(1, line.length - 1)
                });
                break;
            case '+':
                result.diff.push({
                    type: 'add',
                    text: line.substr(1, line.length - 1)
                });
                break;
            default:
                result.diff.push({
                    type: 'normal',
                    text: line.substr(1, line.length - 1)
                });
        }
    }

    return result;
}

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
    fetchCommit: typeof fetchCommit
}

class CommitScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        const params = this.props.navigation.params;

        this.props.fetchCommit(
            params.owner,
            params.repo,
            params.sha,
        );
    }

    renderFile = ({ item }) => {
        console.log(item);

        const patch = parse(item.patch);
        console.log(patch);

        return (
            <View>
                {
                    patch.diff.map(
                        (line: LineDiff, index) => {
                            let lineNumberBackgroundColor: string;
                            let lineBackgroundColor: string;

                            if (line.type === 'add') {
                                lineNumberBackgroundColor = 'rgb(190, 245, 203)';
                                lineBackgroundColor = '#e6ffed';
                            } else if (line.type === 'delete') {
                                lineNumberBackgroundColor = 'rgb(253, 174, 183)';
                                lineBackgroundColor = '#ffeef0';
                            }

                            return (
                                <UIText style={{ backgroundColor: lineBackgroundColor }} key={"line" + index}>
                                    <UIText style={{ backgroundColor: lineNumberBackgroundColor }}>
                                        &nbsp;{patch.newStart + index}&nbsp;
                                    </UIText>
                                    {line.text}
                                </UIText>
                            )
                        }
                    )
                }
            </View>
        )
    };

    render() {
        const { loading, error, commit } = this.props.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <ErrorView
                        error={error}
                        refreshable={true}
                    />
                </View>
            )
        }

        if (!commit) {
            return null;
        }

        console.log(commit);

        return (
            <ScrollView>
                <View style={styles.overviewBox}>
                    <UIText>{commit.commit.message}</UIText>
                </View>
                <FlatList
                    data={commit.files}
                    keyExtractor={(file: Object) => file.sha}
                    renderItem={this.renderFile}
                    refreshing={false}
                />
            </ScrollView>
        )
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
        padding: 10
    },
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation,
            state: state.repositoryCommit
        }
    },
    { fetchCommit }
)(CommitScreen);
