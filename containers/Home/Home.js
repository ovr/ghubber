// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'components';
import { showAccount, showAccountIssues, showProfile, showAbout, logout } from 'actions';

type Props = {
    showAccount: typeof showAccount,
    showAccountIssues: typeof showAccountIssues,
    showAbout: typeof showAbout,
    showProfile: typeof showProfile,
    logout: typeof logout
}

class Home extends PureComponent<Props, void> {
    render() {
        const { showAccount, showAccountIssues, showProfile, showAbout } = this.props;

        return (
            <View style={styles.root}>
                <Button style={styles.button} onPress={() => showAccount()}>
                    Account
                </Button>
                <Button style={styles.button} onPress={() => showAccountIssues()}>
                    Account Issues
                </Button>
                <Button style={styles.button} onPress={() => showProfile('ovr')}>
                    Profile @ovr
                </Button>
                <Button style={styles.button} onPress={() => showProfile('idchlife')}>
                    Profile @idchlife
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
    button: {
        width: 200,
        marginBottom: 10
    }
});

export default connect(
    (state) => state,
    { showProfile, logout, showAccount, showAccountIssues, showAbout }
)(Home);
