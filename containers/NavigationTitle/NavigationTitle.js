// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class NavigationTitle extends PureComponent<void, void, void> {
    render() {
        const { navigation } = this.props;

        return (
            <Text>{navigation.title}</Text>
        );
    }
}

export default connect(
    (state) => ({
        navigation: state.navigation
    })
)(NavigationTitle);
