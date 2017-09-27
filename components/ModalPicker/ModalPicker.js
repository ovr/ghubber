/*
@flow
eslint-disable react-native/no-inline-styles
*/

import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { RowSeparator } from 'components';

type Props = {
    data: Array<any>,
    renderOption: (item: Object) => React$Element<any>
}

export default class ModalPicker extends PureComponent<Props, void> {
    static defaultProps = {
        data: [],
        renderOption: () => {},
    };

    render() {
        const { renderOption, data } = this.props;

        return (
            <FlatList
                data={data}
                renderItem={renderOption}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={RowSeparator}
            />
        );
    }
}
