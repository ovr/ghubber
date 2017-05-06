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

type State = {
    username: string,
    password: string,
    code: string
}

class LoginScreen extends PureComponent<State, Props, void> {
    state: State = {
        username: '',
        password: '',
        code: ''
    };

    renderError(error) {
        return (
            <Text style={styles.error}>Oops! We cannot auth you, possible password/username are wrong ;( </Text>
        )
    }

    render() {
        const { loading, error, twoFA } = this.props.login;
        const { makeLogin } = this.props;
        const { username, password } = this.state;

        return (
            <View style={styles.root}>
                <View style={{ flex: 1, marginTop: 100 }}>
                    <Text style={styles.title}>GHubber</Text>

                    <View style={styles.card}>
                        <InputField
                            placeholder="email or login"
                            style={styles.input}
                            onChangeText={(value) => this.setState({username: value})}
                        />
                        <InputField
                            placeholder="password"
                            style={styles.input}
                            onChangeText={(value) => this.setState({password: value})}
                        />
                        {
                            twoFA ? (
                                <InputField
                                    placeholder="TFA Code"
                                    style={styles.input}
                                    onChangeText={(value) => this.setState({twoFA: value})}
                                />
                            ) : null
                        }
                    </View>

                    { error ? this.renderError() : null}
                    {
                        loading ? <Spinner/> :(
                            <Button onPress={() => makeLogin(username, password)}>
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
    },
    error: {
        marginBottom: 15
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
