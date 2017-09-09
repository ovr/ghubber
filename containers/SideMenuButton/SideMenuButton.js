// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { showSideMenu } from 'actions';

import Icon from 'react-native-vector-icons/FontAwesome';

import type { SettingsState } from 'reducers/settings';

type Props = {
    settings: SettingsState,
    showSideMenu: typeof showSideMenu
}

const iconStyle = { marginLeft: 10 };

class SideMenuButton extends PureComponent<void> {
    static defaultProps: Props;
    render() {
        const { showSideMenu, settings } = this.props;

        return (
            <Icon
                name="list"
                size={24}
                style={[iconStyle, { color: settings.headerTitleColor }]}
                onPress={showSideMenu}
            />
        );
    }
}

export default connect(
    (state) => ({
        settings: state.settings
    }),
    { showSideMenu }
)(SideMenuButton);
