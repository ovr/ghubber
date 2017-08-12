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

        return (
            <View style={[styles.root, style]}>
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
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fafbfc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    }
});
