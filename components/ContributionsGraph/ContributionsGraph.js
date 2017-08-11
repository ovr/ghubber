// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { WebView, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';

// import flow types
import type { UserEntity } from 'github-flow-js';

type Props = {
    user: UserEntity,
};

export default class ContributionsGraph extends PureComponent<void, Props, void> {
    render() {
        // Not supported now for mobile, because It's not optimized for it :(
        if (!isTablet()) {
            return null;
        }

        const { user } = this.props;

        return (
            <WebView
                source={{ uri: `https://github.com/users/${user.login}/contributions` }}
                style={styles.webView}
            />
        );
    }
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        height: 120,
        marginVertical: 20
    }
});
