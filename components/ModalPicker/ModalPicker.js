// @flow
/* eslint-disable react-native/no-inline-styles */

import React, {
    PureComponent,
} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { __ } from 'utils/i18n';

const CANCEL_BUTTON_HEIGHT = 40;
const CANCEL_BUTTON_MARGIN_TOP = 10;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
    },
    optionContainer: {
        borderRadius: 5,
        width: deviceWidth * 0.8,
        backgroundColor: 'white',
        left: deviceWidth * 0.1,
        opacity: 0,
    },
    optionWrapperContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    cancelContainer: {
        left: deviceWidth * 0.1,
        height: CANCEL_BUTTON_HEIGHT,
    },
    cancelStyle: {
        borderRadius: 5,
        width: deviceWidth * 0.8,
        backgroundColor: 'white',
        padding: 8,
    },
    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
    },
});

type Props = {
    data: Array,
    renderOption: Function,
    children: Element,
}

type State = {
    modalVisible: boolean,
    optionContainerHeight?: number,
    topOffset?: number
};

export default class ModalPicker extends PureComponent<Props, State> {
    static defaultProps = {
        data: [],
        renderOption: () => { },
    };

    constructor() {
        super();

        this.state = {
            modalVisible: false,
            optionContainerHeight: null,
            topOffset: null,
        };
    }

    close() {
        this.setState({
            modalVisible: false,
        });
    }

    open() {
        this.setState({
            modalVisible: true,
        });
    }

    onLayout(e) {
        let optionContainerHeight = e.nativeEvent.layout.height;

        if (optionContainerHeight > deviceHeight) {            
            optionContainerHeight = deviceHeight * 0.8;
        }

        const topOffset = (deviceHeight - optionContainerHeight) / 2 + STATUS_BAR_HEIGHT;

        this.setState({
            optionContainerHeight,
            topOffset,
        });
    }

    renderOptionList() {
        const { data, renderOption } = this.props;

        var options = data.map((item) => {
            return renderOption(item);
        });

        return (
            <View>
                <View onLayout={(e) => this.onLayout(e)} style={[styles.optionContainer, {
                    height: this.state.optionContainerHeight,
                    top: this.state.topOffset - CANCEL_BUTTON_HEIGHT,
                    opacity: 1,
                }]}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={styles.optionWrapperContainer}>
                            {options}
                        </View>
                    </ScrollView>
                </View>

                <View style={[styles.cancelContainer, { top: this.state.topOffset - CANCEL_BUTTON_HEIGHT + CANCEL_BUTTON_MARGIN_TOP }]}>
                    <TouchableOpacity onPress={() => this.close()}>
                        <View style={styles.cancelStyle}>
                            <Text style={styles.cancelTextStyle}>
                                {__('ModalPicker.cancelButtonName')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.close()}
                    animationType="fade"
                >
                    <View style={styles.overlay}>
                        {this.renderOptionList()}
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => this.open()}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}
