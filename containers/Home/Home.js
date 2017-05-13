// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { showAccount, showAccountIssues, showProfile, logout } from 'actions';

type Props = {
    showAccount: typeof showAccount,
    showAccountIssues: typeof showAccountIssues,
    showProfile: typeof showProfile,
    logout: typeof logout
}

class Home extends PureComponent<void, Props, void> {
    render() {
        const { showAccount, showAccountIssues, showProfile, logout } = this.props;

        return (
            <View>
                <Button title="Account" onPress={() => showAccount()} />
                <Button title="Account Issues" onPress={() => showAccountIssues()} />
                <Button title="Profile 1" onPress={() => showProfile('ovr')} />
                <Button title="Profile 2" onPress={() => showProfile('idchlife')} />
                <Button title="Logout" onPress={logout} />
            </View>
        )
    }
}

export default connect(
    (state) => state,
    { showProfile, logout, showAccount, showAccountIssues }
)(Home);
