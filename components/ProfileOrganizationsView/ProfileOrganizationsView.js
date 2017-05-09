// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrganizationAvatar } from 'components';

// import flow types
import type { OrganizationEntity } from 'github-flow-js';

type Props = {
    organizations: Array<OrganizationEntity>
};

export default class ProfileOrganizationsView extends PureComponent<void, Props, void> {
    render() {
        const { organizations } = this.props;

        return (
            <View style={styles.root}>
                {
                    organizations.map(
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
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    organizationAvatar: {
        marginRight: 5
    }
})