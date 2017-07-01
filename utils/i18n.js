// @flow

import DeviceInfo from 'react-native-device-info';
import I18n from 'i18n-js';

import en from 'locales/en';
import ru from 'locales/ru';

I18n.fallbacks = true;
I18n.locale = DeviceInfo.getDeviceLocale().split('-')[0];
I18n.translations = {
    en,
    ru
};

export default I18n;