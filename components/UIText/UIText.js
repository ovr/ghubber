// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Platform, Text } from 'react-native';

export default class UIText extends PureComponent<any, void> {
    render() {
        const {
            style,
            children,
            ...props
        } = this.props;

        return (
            <Text style={[styles.text, style]} {...props}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        // @todo think about it
        fontFamily: Platform.OS === 'ios' ? 'system font': 'system font',
        // Default font size, if someone forget to declare it
        fontSize: 14
    }
});
