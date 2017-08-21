// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export function saveStoreKey<S>(key: string, entity: S): S {
    AsyncStorage.setItem(key, JSON.stringify(entity));

    return entity;
}
