// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { showAccountIssues, showAccountPullRequests, showAccountNotifications } from 'actions';
import { __ } from 'utils/i18n';

import type { SettingsState } from 'reducers/settings';

type Props = {
    settings: SettingsState,
    showAccountIssues: typeof showAccountIssues,
    showAccountPullRequests: typeof showAccountPullRequests,
    showAccountNotifications: typeof showAccountNotifications,
}

class HomeHeaderRight extends PureComponent<Props, void> {
    render() {
        const { showAccountIssues, showAccountPullRequests, showAccountNotifications, settings } = this.props;

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={showAccountPullRequests}>
                    <Text style={[styles.buttonText, { color: settings.headerTitleColor }]}>{__('AccountPullRequests.Title')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showAccountIssues}>
                    <Text style={[styles.buttonText, { color: settings.headerTitleColor }]}>{__('AccountIssues.Title')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showAccountNotifications}>
                    <Text style={[styles.buttonText, { color: settings.headerTitleColor }]}>{__('AccountNotifications.Title')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    (state) => ({
        settings: state.settings,
    }),
    { showAccountIssues, showAccountPullRequests, showAccountNotifications }
)(HomeHeaderRight);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8
    },
    button: {
        marginLeft: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});
