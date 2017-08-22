// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, UIText } from 'components';
import { showThemeSelect, showAbout } from 'actions';
import { isTablet } from 'react-native-device-info';

type Props = {
    showThemeSelect: typeof showThemeSelect,
    showAbout: typeof showAbout,
}

class SettingsScreen extends PureComponent<Props, void> {
    render() {
        const { showThemeSelect, showAbout } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.info}>
                    <UIText>Debug: {__DEV__ ? 'enabled' : 'disabled'}</UIText>
                    <UIText>Optimized for tablet: {isTablet() ? 'enabled' : 'disabled'}</UIText>
                </View>
                <Button style={styles.button} onPress={() => showThemeSelect()}>
                    Select Theme
                </Button>
                <Button style={styles.button} onPress={() => showAbout()}>
                    About
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
      marginBottom: 30,
    },
    button: {
        width: 200,
        marginBottom: 10
    }
});

export default connect(
    (state) => state,
    { showThemeSelect, showAbout }
)(SettingsScreen);
