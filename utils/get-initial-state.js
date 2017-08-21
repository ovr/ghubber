// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export async function getInitialState(): Promise<Object> {
    const app = await AsyncStorage.getItem('state:app');
    const accountFeed = await AsyncStorage.getItem('state:account-feed');
    const settings = await AsyncStorage.getItem('state:settings');

    return {
        app: app ? (JSON.parse(app) || undefined) : undefined,
        accountFeed: accountFeed ? (JSON.parse(accountFeed) || undefined) : undefined,
        settings: settings ? (JSON.parse(settings) || undefined) : undefined,
    };
}
