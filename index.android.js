// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Sentry } from 'react-native-sentry';
import { getVersion } from 'react-native-device-info';

if (!__DEV__) {
    Sentry.config(
        'https://8fbfb7692ed242409cabd35e88c8d95a:8dfccf8d35064d0ca147cb31e8064539@sentry.io/168788',
        {
            release: getVersion()
        }
    ).install();
}

import './App';
