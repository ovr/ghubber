// @flow

import DeviceInfo from 'react-native-device-info';
import moment from 'moment/min/moment-with-locales.min';

moment.locale(DeviceInfo.getDeviceLocale().split('-')[0]);

export default moment;
