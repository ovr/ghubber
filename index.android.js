// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Sentry } from 'react-native-sentry';
import { getVersion } from 'react-native-device-info';

Sentry.config(
    'https://d45a31c736c84fc7aca9533e32b6b39d:c562d63b1bc24ccdb89c71fa03717a99@sentry.io/171379',
    {
        release: getVersion()
    }
).install();

import './App';
