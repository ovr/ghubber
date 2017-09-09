// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image } from 'react-native';

// import flow types
import type { OrganizationEntity } from 'github-flow-js';

type Props = {
    organization: OrganizationEntity,
    size: number,
    style?: ComponentStyles
};

export default class OrganizationAvatar extends PureComponent<void> {
    static defaultProps: Props;
    render() {
        const { organization, size, style } = this.props;

        return (
            <Image
                style={[{ width: size, height: size }, style]}
                source={{ uri: organization.avatar_url }}
            />
        );
    }
}
