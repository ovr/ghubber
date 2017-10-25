// @flow
// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, TextIcon, UIText } from 'components';

// import flow types
import type { UserEntity } from 'github-flow-js';

type Props = {
    user: UserEntity
};

export default class ProfileViewMobile extends PureComponent<Props> {
    render() {
        const { user } = this.props;

        return (
            <View style={styles.root}>
                <View style={styles.avatarWrapper}>
                    <Avatar user={user} size={250} />
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
                <View style={styles.info}>
                    <UIText style={styles.name} numberOfLines={1}>
                        { user.name }
                        <UIText style={styles.login} numberOfLines={1}> @{ user.login }</UIText>
                    </UIText>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginBottom: 20,
    },
    info: {
        flex: 1
    },
    avatarWrapper: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 20,
        marginBottom: 5
    },
    login: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    company: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    bio: {
        fontSize: 16,
        marginTop: 5
    },
});
