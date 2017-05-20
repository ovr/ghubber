// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { isTablet } from 'react-native-device-info';

import IssueRowMobile from './IssueRowMobile';
import IssueRowTablet from './IssueRowTablet';

export const IssueRow = isTablet() ? IssueRowTablet : IssueRowMobile;
