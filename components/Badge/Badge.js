// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    text: string,
    backgroundColor?: string
};

export default class Avatar extends PureComponent<void, Props, void> {
    props = {
        backgroundColor: 'yellow',
    }

    render() {
        const { backgroundColor, text } = this.props;

        return (
            <View style={[{backgroundColor: backgroundColor}, styles.root]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    text: {
        color: '#fff'
    }
})