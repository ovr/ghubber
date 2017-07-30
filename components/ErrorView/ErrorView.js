// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, UIText } from 'components';
import { __ } from 'utils/i18n';

type DefaultProps = {
    refreshable: boolean
}

type Props = {
    error: Response,
    refreshable: boolean,
    onPress: () => any,
};

export default class ErrorView extends PureComponent<DefaultProps, Props, void> {
    static defaultProps = {
        refreshable: true,
    };

    render() {
        const { error, refreshable, onPress } = this.props;

        if (refreshable && onPress) {
            return (
                <View style={styles.root}>
                    <UIText style={styles.title}>
                        {__('ErrorView.Title', {errorCode: error.status})}
                    </UIText>
                    <UIText style={styles.message}>
                        {error.message}
                    </UIText>
                    <Button onPress={onPress}>
                        {__('ErrorView.RefreshButton')}
                    </Button>
                </View>
            )
        }

        return (
            <View style={styles.root}>
                <UIText style={styles.message}>
                    {error.message}
                </UIText>
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
