// @flow

import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as profile } from './profile';
import { default as navigation } from './navigation';

export default combineReducers({
    app,
    profile,
    navigation
})
