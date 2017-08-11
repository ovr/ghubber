// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import { connect } from 'react-redux';
import { Repository } from 'containers';

type Props = {
}

class RepositoryScreen extends PureComponent<void, Props, void> {
    render() {
        return (
            <IndicatorViewPager
                style={ styles.viewPager }
                indicator={
                    <PagerTitleIndicator
                        titles={
                            ['Overview', 'Commits']
                        }
                    />
                }
            >
                <View style={styles.page}>
                    <Repository />
                </View>
                <View style={styles.page}>
                    <Text>Commits</Text>
                </View>
            </IndicatorViewPager>
        );
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    page: {
        flex: 1
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation
        };
    }
)(RepositoryScreen);
