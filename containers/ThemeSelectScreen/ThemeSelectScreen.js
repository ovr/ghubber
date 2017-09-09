// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { UIText, Button } from 'components';
import { connect } from 'react-redux';
import { themeChange, showHome } from 'actions';
import { getThemes, getThemeByName } from 'utils/themes';
import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from 'utils/platform';

import Swiper from 'react-native-swiper';

type Props = {
    themeChange: typeof themeChange,
    showHome: typeof showHome,
}

class SettingsScreen extends PureComponent<Props> {
    render() {
        const { themeChange, showHome } = this.props;

        return (
            <Swiper style={styles.wrapper} showsButtons={true}>
                {
                    getThemes().map(
                        (themeName) => {
                            const theme = getThemeByName(themeName);

                            return (
                                <View style={styles.theme} key={'theme' + themeName}>
                                    <View style={[styles.header, { backgroundColor: theme.headerBackgroundColor }]}>
                                        <UIText style={{ color: theme.headerTitleColor }}>Test Title</UIText>
                                    </View>
                                    <View style={styles.body}>
                                        <Button style={styles.selectBtn} onPress={() => { themeChange(themeName); showHome(); }}>
                                            Select Theme
                                        </Button>
                                    </View>
                                </View>
                            );
                        }
                    )
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    theme: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        height: APPBAR_HEIGHT,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtn: {
        flex: 0,
    }
});

export default connect(
    (state) => state,
    { themeChange, showHome }
)(SettingsScreen);
