// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { OrganizationAvatar } from 'components';

// import flow types
import type { OrganizationEntity } from 'github-flow-js';

type Props = {
    organizations: Array<OrganizationEntity>
};

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

export default class ProfileOrganizationsView extends PureComponent<void, Props, void> {
    render() {
        const { organizations } = this.props;

        const organizationsCount = organizations.length;
        const availableWidth = width - (10 * 2);
        const availableElements = parseInt(availableWidth / (50 + ORG_AVATAR_MARGIN_RIGHT), 10);
        const organizationsToRender = organizations.slice(0, availableElements);

        let order = styles.rootFromStart;

        if (!isTablet()) {
            order = organizationsCount - availableElements > 0 ? styles.rootCenter : styles.rootCenter;
        }

        return (
            <View style={[styles.root, order]}>
                {
                    organizationsToRender.map(
                        (organization) => (
                            <OrganizationAvatar
                                key={organization.id}
                                organization={organization}
                                size={50} style={styles.organizationAvatar}
                            />
                        )
                    )
                }
            </View>
        );
    }
}

const ORG_AVATAR_MARGIN_RIGHT = 5;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
    },
    rootFromStart: {
        justifyContent: 'flex-start'
    },
    rootCenter: {
        justifyContent: 'center'
    },
    organizationAvatar: {
        marginRight: ORG_AVATAR_MARGIN_RIGHT
    }
});
