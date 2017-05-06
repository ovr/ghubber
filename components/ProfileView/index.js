// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { isTablet } from 'react-native-device-info';

import ProfileViewMobile from './ProfileViewMobile';
import ProfileViewTablet from './ProfileViewTablet';

export let ProfileView = ProfileViewMobile;

if (isTablet()) {
    ProfileView = ProfileViewTablet;
}
