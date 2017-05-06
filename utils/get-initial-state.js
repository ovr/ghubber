// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { AsyncStorage } from 'react-native';

export async function getInitialState() {
    const app = await AsyncStorage.getItem('state:app');

    console.log(JSON.parse(app));

    return {
        app: app ? (JSON.parse(app) || undefined) : undefined
    };
}
