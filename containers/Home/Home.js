// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { showProfile, logout } from 'actions';

class Home extends PureComponent<void, void, void> {
    render() {
        const { showProfile, logout } = this.props;

        return (
            <View>
                <Button title="Profile 1" onPress={() => showProfile('ovr')} />
                <Button title="Profile 2" onPress={() => showProfile('idchlife')} />
                <Button title="Logout" onPress={logout} />
            </View>
        )
    }
}

export default connect(
    (state) => state,
    { showProfile, logout }
)(Home);
