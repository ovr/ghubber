// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

// import flow types
import type { IssueEntity } from 'github-flow-js';

type Props = {
    issue: IssueEntity,
    onPress: () => void
};

export default class IssueRowMobile extends PureComponent<void, Props, void> {
    render() {

    }
}
