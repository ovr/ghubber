// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import ReactNative, { StyleSheet, Platform } from 'react-native';

export default class Text extends PureComponent<void, any, void> {
    render() {
        let {
            style,
            children,
        } = this.props;

        return (
            <ReactNative.Text style={[style, styles.text]}>
                {children}
            </ReactNative.Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        // @todo think about it
        fontFamily: Platform.OS === 'ios' ? 'system font': 'system font'
    }
})
