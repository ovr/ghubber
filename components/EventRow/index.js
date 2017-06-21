// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { isTablet } from 'react-native-device-info';

import IssueRowMobile from './EventRowMobile';
import IssueRowTablet from './EventRowTablet';

export const EventRow = isTablet() ? IssueRowTablet : IssueRowMobile;
