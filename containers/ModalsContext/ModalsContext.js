// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { UIText } from 'components';
import { connect } from 'react-redux';
import { closeModal } from 'actions';

import { __ } from 'utils/i18n';

import type { ModalsState } from 'reducers/modals';

type Props = {
    state: ModalsState,
    //
    closeModal: typeof closeModal,
};

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
    listContainer: {
        ...containerStyle,
        maxHeight: deviceHeight * 0.7,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    modalContainer: {
        width: deviceWidth * 0.8,
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

class ModalsContext extends PureComponent<Props> {
    renderCancelButton = () => {
        return (
            <TouchableOpacity onPress={this.props.closeModal}>
                <View style={styles.cancelButtonContainer}>
                    <UIText style={styles.cancelButtonText}>
                        {__('ModalPicker.cancelButtonName')}
                    </UIText>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { modals } = this.props.state;

        if (modals.length > 0) {
            return (
                <Modal
                    transparent={true}
                    visible={true}
                    animationType="fade"
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.listContainer}>
                                {modals[modals.length - 1]}
                            </View>
                            {this.renderCancelButton()}
                        </View>
                    </View>
                </Modal>
            );
        }

        return null;
    }
}

export default connect(
    (state) => ({
        state: state.modals
    }),
    { closeModal }
)(ModalsContext);
