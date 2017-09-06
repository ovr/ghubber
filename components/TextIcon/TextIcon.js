// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

type Props = {
    text: string,
    textStyle?: ComponentStyles,
    iconName: string,
    iconSize: number,
    iconStyle?: ComponentStyles,
}

export default class TextIcon extends PureComponent<Props, void> {
    static defaultProps = {
        iconSize: 16,
    };

    render() {
        const { text, textStyle, iconName, iconSize, iconStyle } = this.props;

        return (
            <View style={ styles.container }>
                <Icon name={iconName} size={iconSize} style={[styles.icon, iconStyle]} />

                <Text numberOfLines={1} style={[styles.text, textStyle]}>
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    text: {
        fontSize: 16,
    },
});
