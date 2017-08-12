// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Patch, UIText } from 'components';

type Props = {
    file: Object,
    style: ComponentStyles
}

export default class DiffBlock extends PureComponent<void, Props, void> {

    render() {
        const { file, style } = this.props;

        const totalBlocks = 5;
        const additions = Math.ceil((file.additions / file.changes) * totalBlocks);
        const deletions = Math.ceil((file.deletions / file.changes) * totalBlocks);
        const another = totalBlocks - (additions + deletions);

        const statsBlocks: Array<React.Element<any>> = [];

        for (let i = 0; i < additions; i++) {
            statsBlocks.push(
                <View style={[styles.statsBlock, styles.statsBlockAddition]} key={'statsBlock-additions' + i} />
            );
        }

        for (let i = 0; i < deletions; i++) {
            statsBlocks.push(
                <View style={[styles.statsBlock, styles.statsBlockDeletions]} key={'statsBlock-deletions' + i} />
            );
        }

        for (let i = 0; i < another; i++) {
            statsBlocks.push(
                <View style={styles.statsBlock} key={'statsBlock-another' + i} />
            );
        }
        
        return (
            <View style={[styles.root, style]}>
                <View style={styles.header}>
                    <View style={styles.diffStats}>
                        {statsBlocks}
                    </View>
                    <UIText numberOfLines={1}>{file.filename}</UIText>
                </View>
                <Patch patch={file.patch} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: '#fafbfc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    diffStats: {
        flex: 0,
        flexDirection: 'row',
        marginRight: 5
    },
    statsBlock: {
        width: 8,
        height: 8,
        marginRight: 1,
        backgroundColor: '#d1d5da'
    },
    statsBlockAddition: {
        backgroundColor: '#2cbe4e'
    },
    statsBlockDeletions: {
        backgroundColor: '#cb2431'
    }
});
