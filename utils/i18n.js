// @flow

import DeviceInfo from 'react-native-device-info';
import I18n from 'i18n-js';

import en from 'locales/en';
import ru from 'locales/ru';
import es from 'locales/es';

I18n.fallbacks = true;
I18n.locale = DeviceInfo.getDeviceLocale().split('-')[0];
I18n.translations = {
    en,
    ru,
    es
};

I18n.pluralization['ru'] = function (count) {
    var key = count % 10 == 1 && count % 100 != 11 ? 'one' : [2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0 ? 'few' : count % 10 == 0 || [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 || [11, 12, 13, 14].indexOf(count % 100) >= 0 ? 'many' : 'other';
    return [key];
};

export const __ = I18n.t.bind(I18n);

export default I18n;
