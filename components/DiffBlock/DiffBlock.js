// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Patch, UIText } from 'components';

type Props = {
    file: Object
}

export default class DiffBlock extends PureComponent<void, Props, void> {

    render() {
        const { file } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <UIText>{file.filename}</UIText>
                </View>
                <Patch patch={file.patch} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        // backgroundColor: '#fafbfc'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fafbfc',
        borderWidth: 1,
        borderColor: '#ddd',
    }
});
