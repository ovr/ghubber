// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

type Props = {
}

class SettingsScreen extends PureComponent<Props, void> {
    render() {
        return (
            <View style={styles.root}>
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
    button: {
        width: 200,
        marginBottom: 10
    }
});

export default connect(
    (state) => state,
    { }
)(SettingsScreen);
