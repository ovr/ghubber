// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Image } from 'react-native';

// import flow types
import type { UserEntity } from 'github-flow-js';

type Props = {
    user: UserEntity,
    size: number,
    style?: ComponentStyles
};

export default class Avatar extends PureComponent<Props> {
    render() {
        const { user, size, style } = this.props;

        let uri: string = user.avatarUrl ? user.avatarUrl : `https://avatars0.githubusercontent.com/u/${user.id}?v=3`;

        return (
            <Image
                style={[{ width: size, height: size }, style]}
                source={{ uri: uri }}
            />
        );
    }
}
