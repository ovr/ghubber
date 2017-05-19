// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import { connect } from 'react-redux';
import { Profile, ProfileRepositories } from 'containers';

type Props = {
}

const TITLE_REPOS_INDEX = 1;

class ProfileScreen extends PureComponent<void, Props, void> {
    renderTitle(index: number, title: string, isSelected: boolean): React.Element<any> {
        if (index === TITLE_REPOS_INDEX) {
            return (
                <View style={styles.pageTitleWrapper}>
                    <Text>
                        {title}
                    </Text>
                    <Text style={styles.badge}>
                        171
                    </Text>
                </View>
            )
        }

        return (
            <Text>
                {title}
            </Text>
        )
    }

    render() {
        return (
            <IndicatorViewPager
                style={ styles.viewPager }
                indicator={
                    <PagerTitleIndicator
                        titles={
                            ['Overview', 'Repos']
                        }
                        renderTitle={this.renderTitle.bind(this)}
                    />
                }
            >
                <View style={styles.page}>
                    <Profile />
                </View>
                <View style={styles.page}>
                    <ProfileRepositories />
                </View>
            </IndicatorViewPager>
        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    page: {
        flex: 1
    },
    pageTitleWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        fontSize: 12,
        marginLeft: 10,
        backgroundColor: '#3498db',
        color: '#fff',
        paddingVertical: 3,
        paddingHorizontal: 5
    }
});

export default connect(
    (state) => {
        return {
            navigation: state.navigation
        }
    }
)(ProfileScreen);
