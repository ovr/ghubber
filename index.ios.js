// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Sentry } from 'react-native-sentry';
import { getVersion } from 'react-native-device-info';

if (!__DEV__) {
    Sentry.config(
        'https://a8a0f9d5be7e4d03890935bdbd4c8332:04008163befb47cbbad5c094d4d18488@sentry.io/171376',
        {
            release: getVersion()
        }
    ).install();
}

import './App';
