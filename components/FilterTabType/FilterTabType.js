// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'components';

type Props = {
    title: string,
    active: boolean,
    onPress: () => null,
};

export default class FilterTabType extends PureComponent<void, Props, void> {
    render() {
        const { active, title, onPress } = this.props;

        if (active) {
            return (
                <View style={[styles.accountIssuesType, styles.accountIssuesTypeActive]}>
                    <Text style={[styles.accountIssuesTypeText, styles.accountIssuesTypeTextActive]}>
                        {title}
                    </Text>
                </View>
            )
        }

        return (
            <TouchableOpacity
                style={styles.accountIssuesType}
                onPress={onPress}
            >
                <Text style={styles.accountIssuesTypeText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    accountIssuesTypeActive: {
        backgroundColor: '#0366d6',
        borderColor: '#0366d6'
    },
    accountIssuesType: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#e1e4e8'
    },
    accountIssuesTypeTextActive: {
        color: '#fff',
    },
    accountIssuesTypeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#586069'
    },
});
