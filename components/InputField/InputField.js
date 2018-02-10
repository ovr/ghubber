// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = {
    onChangeText: (value: string) => any,
    placeholder: string,
    secureTextEntry?: boolean,
    style?: ComponentStyles
};

export default class InputField extends PureComponent<Props> {
    render() {
        const { style, placeholder, onChangeText, secureTextEntry } = this.props;

        return (
            <TextInput
                style={[styles.input, style]}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid="transparent"
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        color: '#9197A3',
        backgroundColor: '#FAFAFA',
        borderColor: '#D8D8D8',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 10,
    }
});
