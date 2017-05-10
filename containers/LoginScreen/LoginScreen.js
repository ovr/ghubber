// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Text, Platform } from 'react-native';
import { Button, InputField, Spinner } from 'components';
import { connect } from 'react-redux';
import { makeLogin, showHome } from 'actions';
import { images } from 'utils/images';

// import flow types
import type { AppState } from 'reducers/app';
import type { LoginState } from 'reducers/login';

type Props = {
    app: AppState,
    login: LoginState,
    showHome: typeof showHome,
    makeLogin: typeof makeLogin,
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

    componentWillMount() {
        const { user, authorization } = this.props.app;

        if (user && authorization) {
            this.props.showHome();
        }
    }

    renderError(error) {
        return (
            <Text style={styles.error}>Oops! We cannot auth you, possible password/username are wrong ;( </Text>
        )
    }

    render() {
        const { loading, error, twoFA } = this.props.login;
        const { makeLogin } = this.props;
        const { username, password, code } = this.state;

        return (
            <Image resizeMode="cover" style={styles.background} source={images.background}>
                <View style={styles.root}>
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
                            secureTextEntry={true}
                        />
                        {
                            twoFA ? (
                                <InputField
                                    placeholder="TFA Code"
                                    style={styles.input}
                                    onChangeText={(value) => this.setState({code: value})}
                                />
                            ) : null
                        }
                    </View>

                    { error ? this.renderError() : null}
                    {
                        loading ? <Spinner/> :(
                            <Button onPress={() => makeLogin(username, password, code)}>
                                Login
                            </Button>
                        )
                    }
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: null,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    root: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'transparent'
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
            login: state.login,
            app: state.app
        }
    },
    { makeLogin, showHome }
)(LoginScreen);
