// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SideMenu } from 'containers';
import { showSideMenu, hideSideMenu } from 'actions';

import SideMenuRender from 'react-native-side-menu';

import type { SideMenuState } from 'reducers/side-menu';
import type { AppState } from 'reducers/app';

type Props = {
    sideMenu: SideMenuState,
    app: AppState,
    showSideMenu: typeof showSideMenu,
    hideSideMenu: typeof hideSideMenu,
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
        const { app, children } = this.props;

        if (app.authorization) {
            return (
                <SideMenuRender menu={<SideMenu />} isOpen={this.props.sideMenu.open} onChange={this.onChange}>
                    {children}
                </SideMenuRender>
            );
        }

        return children;
    }
}

export default connect(
    (state) => ({
        sideMenu: state.sideMenu,
        app: state.app
    }),
    { showSideMenu, hideSideMenu }
)(SideMenuDrawer);
