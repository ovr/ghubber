// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export function saveStoreKey(key: string, entity: Object) {
    AsyncStorage.setItem(key, JSON.stringify(entity));
}
