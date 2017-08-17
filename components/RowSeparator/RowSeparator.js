// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class RowSeparator extends Component<void, void> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <View style={styles.row}/>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 1,
        backgroundColor: '#dfe2e5'
    }
});