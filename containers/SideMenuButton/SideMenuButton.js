// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { showSideMenu } from 'actions';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    showSideMenu: typeof showSideMenu
}

class SideMenuButton extends PureComponent<void, Props, void> {
    render() {
        const { showSideMenu } = this.props;

        return (
            <Icon
                name="list"
                size={24}
                style={{ marginLeft: 10 }}
                onPress={showSideMenu}
            />
        )
    }
}

export default connect(
    (state) => state,
    { showSideMenu }
)(SideMenuButton);
