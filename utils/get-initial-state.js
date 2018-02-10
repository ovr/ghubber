// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export async function getInitialState(): Promise<Object> {
    const [ appPair, accountFeedPair, settingsPair] = await AsyncStorage.multiGet([
        'state:app',
        'state:account-feed',
        'state:settings'
    ]);

    return {
        app: appPair[1] ? (JSON.parse(appPair[1]) || undefined) : undefined,
        accountFeed: accountFeedPair[1] ? (JSON.parse(accountFeedPair[1]) || undefined) : undefined,
        settings: settingsPair[1] ? (JSON.parse(settingsPair[1]) || undefined) : undefined,
    };
}
