// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';

import { makeOAuthLogin } from 'actions';
import queryString from 'query-string';

type Props = {
    makeOAuthLogin: typeof makeOAuthLogin,
}

class OAuthScreen extends PureComponent<Props> {
    oauthCallback = ({ url }) => {
        const query = url.substring('ghubber://login?' . length);

        this.props.makeOAuthLogin(queryString.parse(query).access_token);
    }

    render() {
        return (
            <View style={styles.root}>
                <WebView
                    source={{
                        url: GHUBBER_OAUTH
                    }}
                    onNavigationStateChange={this.oauthCallback}
                    startInLoadingState
                    javaScriptEnabled
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default connect(
    null,
    { makeOAuthLogin }
)(OAuthScreen);
