// @flow

import { getDeviceLocale } from 'react-native-device-info';
import moment from 'moment';

import 'moment/min/locales';

moment.locale(getDeviceLocale().split('-')[0]);

export default moment;
