// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import { connect } from 'react-redux';
import { Profile, ProfileRepositories } from 'containers';

type Props = {
}

class ProfileScreen extends PureComponent<void, Props, void> {
    render() {
        return (
            <IndicatorViewPager
                style={ styles.viewPager }
                indicator={
                    <PagerTitleIndicator
                        titles={
                            ['Overview', 'Repos']
                        }
                    />
                }
            >
                <View style={{ flex: 1 }}>
                    <Profile />
                </View>
                <View style={{ flex: 1 }}>
                    <ProfileRepositories />
                </View>
                <View>
                    <Text>Starred</Text>
                </View>
            </IndicatorViewPager>
        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        flexDirection: 'column-reverse'
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation
        }
    }
)(ProfileScreen);
