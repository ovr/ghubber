// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'components';

type Props = {
    error: Object,
    refreshable: boolean,
    onPress: () => null,
};

export default class ErrorView extends PureComponent<void, Props, void> {
    render() {
        const { error, refreshable, onPress } = this.props;

        if (refreshable) {
            return (
                <View style={styles.root}>
                    <Text style={styles.title}>
                        Sorry, but We are having {error.code} on response :(
                    </Text>
                    <Text style={styles.message}>
                        {error.message}
                    </Text>
                    <Button onPress={onPress}>
                        Refresh ;)
                    </Button>
                </View>
            )
        }

        return (
            <View style={styles.root}>
                <Text style={styles.message}>
                    {error.message}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        minWidth: 400
    },
    title: {
        flex: 0,
        textAlign: 'center',
        fontSize: 22,
        color: 'red'
    },
    message: {
        flex: 0,
        textAlign: 'center',
        paddingVertical: 20,
        fontSize: 18,
    }
});
