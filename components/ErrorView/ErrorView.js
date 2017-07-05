// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'components';
import I18n from 'utils/i18n';

type Props = {
    error: Object,
    refreshable: boolean,
    onPress: () => any,
};

export default class ErrorView extends PureComponent<void, Props, void> {
    render() {
        const { error, refreshable, onPress } = this.props;

        if (refreshable) {
            return (
                <View style={styles.root}>
                    <Text style={styles.title}>
                        {I18n.t('ErrorView.Title', {errorCode: error.code})}
                    </Text>
                    <Text style={styles.message}>
                        {error.message}
                    </Text>
                    <Button onPress={onPress}>
                        {I18n.t('ErrorView.RefreshButton')}
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
