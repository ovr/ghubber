// @flow

import { Sentry } from 'react-native-sentry';

export function captureException(e: Error) {
    // eslint-disable-next-line no-undef
    if (SENTRY_ENABLED) {
        Sentry.captureException(e)
    }

    console.warn(e)
}
