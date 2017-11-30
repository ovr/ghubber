// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, UIText, TextIcon } from 'components';
import ProfileViewMobile  from './ProfileViewMobile';

// import flow types
import type { UserEntity } from 'github-flow-js';

type Props = {
    user: UserEntity
};

export default class ProfileViewTablet extends ProfileViewMobile<Props> {
    render() {
        const { user } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.left}>
                    <Avatar user={user} size={150} />
                    {this.renderFollowButton()}
                </View>
                <View style={styles.right}>
                    <View style={styles.info}>
                        <View style={styles.infoHeader}>
                            <UIText style={styles.name} numberOfLines={1}>
                                { user.name }
                                <UIText style={styles.login} numberOfLines={1}> @{ user.login }</UIText>
                            </UIText>
                        </View>
                        {
                            user.company ? (
                                <TextIcon
                                    text={user.company}
                                    textStyle={styles.company}
                                    iconName={'organization'}
                                />
                            ) : null
                        }
                        {
                            user.location ? (
                                <TextIcon
                                    text={user.location}
                                    iconName={'location'}
                                    textStyle={styles.company}
                                />
                            ) : null
                        }
                        {
                            user.email ? (
                                <TextIcon
                                    text={user.email}
                                    iconName={'mail'}
                                />
                            ) : null
                        }
                        {
                            user.websiteUrl ? (
                                <TextIcon
                                    text={user.websiteUrl}
                                    iconName={'link'}
                                />
                            ) : null
                        }
                        <UIText style={styles.bio}>{ user.bio }</UIText>
                    </View>
                    <View style={styles.statsWrapper}>
                        <View style={styles.statsBlock}>
                            <UIText style={styles.statsBlockTitle}>
                                Repos
                            </UIText>
                            <UIText>
                                {user.repositories.totalCount}
                            </UIText>
                        </View>
                        <View style={styles.statsBlock}>
                            <UIText style={styles.statsBlockTitle}>
                                Gists
                            </UIText>
                            <UIText>
                                {user.gists.totalCount}
                            </UIText>
                        </View>
                        <View style={styles.statsBlock}>
                            <UIText style={styles.statsBlockTitle}>
                                Followers
                            </UIText>
                            <UIText>
                                {user.followers.totalCount}
                            </UIText>
                        </View>
                        <View style={styles.statsBlock}>
                            <UIText style={styles.statsBlockTitle}>
                                Following
                            </UIText>
                            <UIText>
                                {user.following.totalCount}
                            </UIText>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    info: {
        flex: 1
    },
    left: {
        flex: 0,
        paddingRight: 20,
    },
    right: {
        flex: .7,
    },
    statsWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 15,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#dfe2e5',
        borderRadius: 4
    },
    statsBlock: {
        flex: 0.25
    },
    statsBlockTitle: {
        fontWeight: 'bold'
    },
    name: {
        fontSize: 24
    },
    login: {
        fontSize: 20,
        color: '#666',
        fontWeight: 'bold'
    },
    bio: {
        fontSize: 20,
        marginTop: 5
    },
    company: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    infoHeader: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
    }
});
