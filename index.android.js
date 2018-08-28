// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Sentry } from 'react-native-sentry';
import { getVersion } from 'react-native-device-info';

// eslint-disable-next-line no-undef
if (SENTRY_ENABLED) {
    Sentry.config(
        'https://72052f3c63ed49beb78fff6830173c21@sentry.io/1269911',
        {
            release: getVersion()
        }
    ).install();
}


import './App';
