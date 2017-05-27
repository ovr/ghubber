// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export async function getInitialState() {
    const app = await AsyncStorage.getItem('state:app');
    const accountFeed = await AsyncStorage.getItem('state:account-feed');

    return {
        app: app ? (JSON.parse(app) || undefined) : undefined,
        accountFeed: accountFeed ? (JSON.parse(accountFeed) || undefined) : undefined,
    };
}
