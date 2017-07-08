// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { showAccountIssues, showAccountPullRequests } from 'actions';
import I18n from 'utils/i18n';

type Props = {
    showAccountIssues: typeof showAccountIssues
}

class HomeHeaderRight extends PureComponent<void, Props, void> {
    render() {
        const { showAccountIssues, showAccountPullRequests } = this.props;

        return (
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={showAccountPullRequests}>
                    <Text style={styles.buttonText}>{I18n.t('AccountPullRequests.Title')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showAccountIssues}>
                    <Text style={styles.buttonText}>{I18n.t('HomeHeaderRight.IssuesTitle')}</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.button}>*/}
                    {/*<Text style={styles.buttonText}>Notifications</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

export default connect(
    (state) => state,
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
