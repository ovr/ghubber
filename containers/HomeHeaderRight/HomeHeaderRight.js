// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { showAccountIssues, showAccountPullRequests } from 'actions';

import I18n from 'utils/i18n';

import type { SettingsState } from 'reducers/settings';

type Props = {
    settings: SettingsState,
    showAccountIssues: typeof showAccountIssues,
    showAccountPullRequests: typeof showAccountPullRequests
}

class HomeHeaderRight extends PureComponent<Props, void> {
    render() {
        const { showAccountIssues, showAccountPullRequests, settings } = this.props;

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={showAccountPullRequests}>
                    <Text style={[styles.buttonText, { color: settings.headerTitleColor }]}>{I18n.t('AccountPullRequests.Title')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showAccountIssues}>
                    <Text style={[styles.buttonText, { color: settings.headerTitleColor }]}>{I18n.t('HomeHeaderRight.IssuesTitle')}</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.button}>*/}
                    {/*<Text style={styles.buttonText}>Notifications</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    }
}

export default connect(
    (state) => ({
        settings: state.settings,
    }),
    { showAccountIssues, showAccountPullRequests }
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
