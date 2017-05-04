// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Button, InputField, Spinner } from 'components';
import { connect } from 'react-redux';
import { makeLogin } from 'actions';

// import flow types
import type { LoginState } from 'reducers/login';

type Props = {
    login: LoginState,
    makeLogin: typeof makeLogin
}

class LoginScreen extends PureComponent<void, Props, void> {
    render() {
        const { loading } = this.props.login;
        const { makeLogin } = this.props;

        return (
            <View style={styles.root}>
                <View style={{ flex: 1, marginTop: 100 }}>
                    <Text style={styles.title}>GHubber</Text>

                    <View style={styles.card}>
                        <InputField placeholder="email or login" style={styles.input} />
                        <InputField placeholder="password" style={styles.input} />
                    </View>

                    {
                        loading ? <Spinner/> :(
                            <Button onPress={makeLogin}>
                                Login
                            </Button>
                        )
                    }
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
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    card: {
        flex: 0,
        marginVertical: 10
    },
    input: {
        flex: 0,
        height: 40,
        marginBottom: 10
    }
});

export default connect(
    (state) => {
        return {
            login: state.login
        }
    },
    { makeLogin }
)(LoginScreen);
