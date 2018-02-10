// @flow

import Realm from 'realm';

const NotificationSchema = {
    name: 'Notification',
    primaryKey: 'id',
    properties: {
        id:  'string',
        unread: { type: 'bool', indexed: true },
        reason: 'string',
        subject: 'NotificationSubject',
        repository: 'Repository',
        updated_at: 'string',
    },
};

const NotificationSubjectSchema = {
    name: 'NotificationSubject',
    properties: {
        title: 'string',
        type:  'string',
        url: 'string'
    },
};

const RepositorySchema = {
    name: 'Repository',
    properties: {
        id:  'int',
        name: 'string',
        full_name: 'string',
        owner: 'RepositoryOwner'
    },
};

const RepositoryOwnerSchema = {
    name: 'RepositoryOwner',
    properties: {
        login: 'string',
    },
};

export default new Realm({
    schema: [
        NotificationSchema,
        RepositorySchema,
        NotificationSubjectSchema,
        RepositoryOwnerSchema,
    ],
    migration: () => {
        console.warn('Realm.migration ->');
    },
    schemaVersion: 2,
});
