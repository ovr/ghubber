// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SideMenu } from 'containers';
import { showSideMenu, hideSideMenu } from 'actions';

import SideMenuRender from 'react-native-side-menu';

import type { SideMenuState } from 'reducers/side-menu';
import type { AppState } from 'reducers/app';
import type { NavigationState } from 'reducers/navigation';

type Props = {
    sideMenu: SideMenuState,
    navigation: NavigationState,
    app: AppState,
    showSideMenu: typeof showSideMenu,
    hideSideMenu: typeof hideSideMenu,
    children: React$Node
}

class SideMenuDrawer extends PureComponent<Props> {
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
        const { app, navigation, children } = this.props;

        // only user can view side menu, and only on first page
        if (app.authorization && navigation.index == 0) {
            return (
                <SideMenuRender menu={<SideMenu />} isOpen={this.props.sideMenu.open} onChange={this.onChange}>
                    {children}
                </SideMenuRender>
            );
        }

        /**
         * @todo Try to remove this unneeded View inside RN 0.49+, because looks like 0.48 broken
         * Easy easy, real talk, think about this man https://www.youtube.com/watch?v=adnlD8emXR4
         */
        return (
            <View style={styles.root}>
                {children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});

export default connect(
    (state) => ({
        sideMenu: state.sideMenu,
        app: state.app,
        navigation: state.navigation,
    }),
    { showSideMenu, hideSideMenu }
)(SideMenuDrawer);
