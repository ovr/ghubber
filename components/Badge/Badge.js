// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    text: string,
    backgroundColor?: string
};

export default class Badge extends PureComponent<void, Props, void> {
    render() {
        const { backgroundColor, text } = this.props;

        return (
            <View style={[{backgroundColor: backgroundColor || 'yellow'}, styles.root]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        flexDirection: 'row',
        paddingVertical: 1,
        paddingHorizontal: 4,
        marginRight: 10,
    },
    text: {
        color: '#fff'
    }
})