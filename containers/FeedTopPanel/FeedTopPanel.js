// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Avatar, OrganizationAvatar, ModalPicker } from 'components';
import { showHome, changeAccountFeedLogin, addModal, closeModal } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';
import type { AuthAppState } from 'reducers/app';

type Props = {
    feed: AccountFeedState,
    app: AuthAppState,
    showHome: typeof showHome,
    addModal: typeof addModal,
    closeModal: typeof closeModal,
    changeAccountFeedLogin: typeof changeAccountFeedLogin,
}

class FeedTopPanel extends PureComponent<Props> {
    openModal = () => {
        const { app, addModal, showHome, changeAccountFeedLogin, closeModal } = this.props;

        addModal(
            <ModalPicker
                data={[app.user].concat(app.organizations)}
                renderOption={
                    ({ item }) => {
                        return (
                            <TouchableOpacity
                                key={'organization' + item.login}
                                style={styles.option}
                                onPress={() => {
                                    changeAccountFeedLogin(item.login);
                                    closeModal();
                                    showHome();
                                }}
                            >
                                <OrganizationAvatar organization={item} size={24} style={styles.optionAvatar} />
                                <Text>{item.login}</Text>
                            </TouchableOpacity>
                        );
                    }
                }
            />
        );
    };

    render() {
        const { app, feed } = this.props;

        let isOrganization = false;
        let selectedEntity = app.user;

        if (feed.login !== null && feed.login !== app.user.login) {
            const result = app.organizations.find(
                (entity) => {
                    return entity.login === feed.login;
                }
            );

            if (result) {
                isOrganization = true;
                selectedEntity = result;
            }
        }

        return (
            <TouchableOpacity style={styles.root} onPress={this.openModal}>
                <View style={styles.selectWrapper}>
                    {
                        isOrganization ? (
                            <OrganizationAvatar organization={selectedEntity} size={20} style={styles.avatar} />
                        ) : (
                            <Avatar user={selectedEntity} size={20} style={styles.avatar} />
                        )
                    }
                    <Text style={styles.selectText}>
                        {selectedEntity.login} ▾
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 0,
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e4e8'
    },
    selectWrapper: {
        borderColor: 'rgba(27, 31, 35, 0.2)',
        borderWidth: 1,
        backgroundColor: '#e6ebf1',
        padding: 5,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 5,
    },
    selectText: {
        color: '#24292e',
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    option: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionAvatar: {
        marginRight: 10,
    },
});

export default connect(
    (state) => ({
        feed: state.accountFeed,
        app: state.app,
    }),
    { showHome, changeAccountFeedLogin, addModal, closeModal }
)(FeedTopPanel);
