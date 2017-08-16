// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SideMenu } from 'containers';
import { showSideMenu, hideSideMenu } from 'actions';

import SideMenuRender from 'react-native-side-menu';

import type { SideMenuState } from 'reducers/side-menu';

type Props = {
    showSideMenu: typeof showSideMenu,
    hideSideMenu: typeof hideSideMenu,
    sideMenu: SideMenuState,
    children: React.Element<any>
}

class SideMenuDrawer extends PureComponent<void, Props, void> {
    // This method is needed to sync open status, when user open side menu and click on the content inside Screen
    onChange = (open) => {
        const { showSideMenu, hideSideMenu } = this.props;

        if (open) {
            showSideMenu();
        } else {
            hideSideMenu();
        }
    };

    render() {
        const { children } = this.props;

        return (
            <SideMenuRender menu={<SideMenu />} isOpen={this.props.sideMenu.open} onChange={this.onChange}>
                {children}
            </SideMenuRender>
        );
    }
}

export default connect(
    (state) => ({
        sideMenu: state.sideMenu
    }),
    { showSideMenu, hideSideMenu }
)(SideMenuDrawer);
