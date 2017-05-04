// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TextInput, Platform } from 'react-native';
import { Button } from 'components';
import { connect } from 'react-redux';
import { login } from 'actions';

type Props = {
    login: typeof login
}

class LoginScreen extends PureComponent<void, Props, void> {
    render() {
        const { login } = this.props;

        return (
            <View style={styles.root}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title}>GHubber</Text>

                    <TextInput style={styles.input} placeholder={"email or login"} autoCapitalize="none" />
                    <TextInput style={styles.input} placeholder={"password"} autoCapitalize="none" />

                    <Button onPress={login}>
                        Login
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 20,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    input: {
        width: 100,
        height: 40
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation
        }
    },
    { login }
)(LoginScreen);
