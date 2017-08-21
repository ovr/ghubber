// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Platform } from 'react-native';

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
