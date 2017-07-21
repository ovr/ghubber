// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';

type Props = {
    style?: ComponentStyles
};

export default class Spinner extends PureComponent<void, Props, void> {
    render() {
        const { style } = this.props;

        return (
            <ActivityIndicator size={'large'} style={style} />
        )
    }
}
