// @flow

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import merge from 'lodash/merge';

type Props = {
    text: Object,
    icon: Object,
};

export default class TextIcon extends PureComponent<void, Props, void> {
    static propTypes = {
        text: PropTypes.shape({
            content: PropTypes.any.isRequired,
        }),
        icon: PropTypes.shape({
            name: PropTypes.any.isRequired,
        })
    };

    static defaultProps = {
        text: {
            style: {},
        },
        icon: {
            size: 16,
            style: {},
        },
    };

    render() {
        const { text, icon } = merge(TextIcon.defaultProps, this.props);

        return (
            <View style={ styles.container }>
                <Icon name={ icon.name } size={ icon.size } style={ [styles.icon, icon.style] } />

                <Text numberOfLines={ 1 } style={ [styles.text, text.style] }>
                    { text.content }
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
