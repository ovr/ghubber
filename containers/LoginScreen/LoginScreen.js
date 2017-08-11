// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { ImageBackground, View, StyleSheet, Text, Platform, Linking, TouchableOpacity } from 'react-native';
import { Button, InputField, Spinner, KeyboardAvoidingView } from 'components';
import { connect } from 'react-redux';
import { makeLogin, showHome, makeOAuthLogin } from 'actions';
import { images } from 'utils/images';
import queryString from 'query-string';
import Icon from 'react-native-vector-icons/FontAwesome';

// import flow types
import type { AppState } from 'reducers/app';
import type { LoginState } from 'reducers/login';

type Props = {
    app: AppState,
    login: LoginState,
    showHome: typeof showHome,
    makeLogin: typeof makeLogin,
    makeOAuthLogin: typeof makeOAuthLogin,
}

type State = {
    username: string,
    password: string,
    code: string
}

class LoginScreen extends PureComponent<void, Props, State> {
    state: State = {
        username: '',
        password: '',
        code: ''
    };

    componentWillMount() {
        const { user, authorization } = this.props.app;

        if (user && authorization) {
            this.props.showHome();
        } else {
            // Mostly for Android
            Linking.getInitialURL().then(
                (url) => {
                    if (url) {
                        this.oauthCallback({ url });
                    }
                }
            );

            Linking.addEventListener('url', this.oauthCallback.bind(this));
        }
    }

    renderError(): React.Element<any> {
        return (
            <Text style={styles.error}>Oops! We cannot auth you, possible password/username are wrong ;( </Text>
        );
    }

    oauthCallback({ url }) {
        const query = url.substring('ghubber://login?' . length);

        this.props.makeOAuthLogin(queryString.parse(query).access_token);
    }

    oauthLogin() {
        // eslint-disable-next-line no-undef
        Linking.openURL(GHUBBER_OAUTH);
    }

    render() {
        const { loading, error, twoFA } = this.props.login;
        const { makeLogin } = this.props;
        const { username, password, code } = this.state;

        return (
            <ImageBackground
                resizeMode="cover"
                style={styles.root}
                imageStyle={styles.background}
                source={images.background}
            >
                <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                    <Text style={styles.title}>GHubber</Text>

                    {
                        loading ? null : (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.oauthLogin()}>
                                <View style={styles.oauthBtn}>
                                    <Icon name="github" size={30} style={styles.oauthBtnIcon} />
                                    <Text style={styles.oauthBtnText}> Login with GitHub</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                    <View style={styles.hr}>
                        <View style={styles.hrLine} />
                        <View >
                            <Text style={styles.hrText}>OR</Text>
                        </View>
                        <View style={styles.hrLine} />
                    </View>

                    <View style={styles.card}>
                        <InputField
                            placeholder="email or login"
                            style={styles.input}
                            onChangeText={(value) => this.setState({ username: value })}
                        />
                        <InputField
                            placeholder="password"
                            style={styles.input}
                            onChangeText={(value) => this.setState({ password: value })}
                            secureTextEntry={true}
                        />
                        {
                            twoFA ? (
                                <InputField
                                    placeholder="TFA Code"
                                    style={styles.input}
                                    onChangeText={(value) => this.setState({ code: value })}
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
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    background: {
        flex: 1,
        width: null
    },
    wrapper: {
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
    },
    oauthBtn: {
        backgroundColor: '#444',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        marginBottom: 15,
        alignItems: 'center'
    },
    oauthBtnIcon: {
        color: '#fff',
        marginRight: 5,
    },
    oauthBtnText: {
        color: '#fff',
        fontSize: 16,
    },
    hr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    hrLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#000',
    },
    hrText: {
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontSize: 20,
        color: '#000',
    },
});

export default connect(
    (state) => {
        return {
            login: state.login,
            app: state.app
        };
    },
    { makeLogin, makeOAuthLogin, showHome }
)(LoginScreen);
