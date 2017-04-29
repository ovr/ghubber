// @flow

import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { showProfile } from 'actions';

class Home extends PureComponent<void, void, void> {
    render() {
        const { showProfile } = this.props;

        return (
            <View>
                <Button title="Profile 1" onPress={() => showProfile('ovr')} />
                <Button title="Profile 2" onPress={() => showProfile('idchlife')} />
            </View>
        )
    }
}

export default connect(
    (state) => state,
    { showProfile }
)(Home);
