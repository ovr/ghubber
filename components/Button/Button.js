// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { UIText } from 'components';

type Props = {
    children: Object,
    onPress: () => any,
    style?: ComponentStyles
};

export default class Button extends PureComponent<void> {
    static defaultProps: Props;
    render() {
        const { style, children, onPress } = this.props;

        return (
            <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
                <UIText style={styles.text}>
                    {children}
                </UIText>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        backgroundColor: '#0094EA',
        padding: 10,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
