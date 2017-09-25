/*
@flow
eslint-disable react-native/no-inline-styles
*/

import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    TouchableOpacity,
    ListView,
} from 'react-native';

import { __ } from 'utils/i18n';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const containerStyle = {
    borderRadius: 5,
    backgroundColor: 'white',
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: deviceWidth * 0.8,
    },
    listContainer: {
        ...containerStyle,
        maxHeight: deviceHeight * 0.7,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    cancelButtonContainer: {
        ...containerStyle,
        height: 40,
        padding: 8,
        marginTop: 10,
    },
    cancelButtonText: {
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
    dataSource: ListView.DataSource,
};

export default class ModalPicker extends PureComponent<Props, State> {
    static defaultProps = {
        data: [],
        renderOption: () => { },
    };

    constructor(props) {
        super();

        this.state = {
            modalVisible: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1.key !== r2.key
            }).cloneWithRows(props.data),
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

    renderOptionList() {
        const { renderOption } = this.props;
        const { dataSource } = this.state;

        return (
            <View style={styles.listContainer}>
                <ListView
                    enableEmptySections={false}
                    dataSource={dataSource}
                    renderRow={renderOption}
                />
            </View>
        );
    }

    renderCancelButton() {
        return (
            <TouchableOpacity onPress={() => this.close()}>
                <View style={styles.cancelButtonContainer}>
                    <Text style={styles.cancelButtonText}>
                        {__('ModalPicker.cancelButtonName')}
                    </Text>
                </View>
            </TouchableOpacity>
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
                        <View style={styles.modalContainer}>
                            {this.renderOptionList()}
                            {this.renderCancelButton()}
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => this.open()}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}
