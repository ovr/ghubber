// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string,
    active: boolean,
    onPress: () => any,
};

export default class FilterTabType extends PureComponent<void, Props, void> {
    render() {
        const { active, title, onPress } = this.props;

        if (active) {
            return (
                <View style={[styles.accountIssuesType, styles.accountIssuesTypeActive]}>
                    <Text style={[styles.accountIssuesTypeText, styles.accountIssuesTypeTextActive]}>
                        {title.replace(/\s\s/g, '\n')}
                    </Text>
                </View>
            )
        }

        return (
            <TouchableOpacity
                style={styles.accountIssuesType}
                onPress={onPress}
            >
                <Text style={styles.accountIssuesTypeText}>
                    {title.replace(/\s\s/g, '\n')}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    accountIssuesTypeActive: {
        backgroundColor: '#0366d6',
        borderColor: '#0366d6',
    },
    accountIssuesType: {
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#e1e4e8',
        flex: 1,
        justifyContent: 'center',
    },
    accountIssuesTypeTextActive: {
        color: '#fff',
    },
    accountIssuesTypeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#586069',
        textAlign: 'center',
    },
});
