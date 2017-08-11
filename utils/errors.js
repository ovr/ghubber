// @flow

import { Sentry } from 'react-native-sentry';

export function captureException(e: Error) {
    console.warn(e);

    // eslint-disable-next-line no-undef
    if (SENTRY_ENABLED) {
        Sentry.captureException(e);
    }
}
