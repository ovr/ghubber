// @flow

import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as profile } from './profile';

export default combineReducers({
    app,
    profile
})
