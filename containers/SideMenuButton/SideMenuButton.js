// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { showSideMenu } from 'actions';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    showSideMenu: typeof showSideMenu
}

const iconStyle = { marginLeft: 10 };

class SideMenuButton extends PureComponent<Props, void> {
    render() {
        const { showSideMenu } = this.props;

        return (
            <Icon
                name="list"
                size={24}
                style={iconStyle}
                onPress={showSideMenu}
            />
        );
    }
}

export default connect(
    (state) => state,
    { showSideMenu }
)(SideMenuButton);
