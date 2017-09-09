// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Blank extends PureComponent<void> {
    render() {
        return (
            <View style={styles.blank} />
        );
    }
}

const styles = StyleSheet.create({
    blank: {
        height: 100
    }
});
