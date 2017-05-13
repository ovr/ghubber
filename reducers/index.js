// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as login } from './login';
import { default as profile } from './profile';
import { default as accountIssues } from './account-issues';
import { default as profileRepositories } from './profile-repositories';
import { default as profileOrganizations } from './profile-organizations';
import { default as navigation } from './navigation';
import { default as repository } from './repository';

export default combineReducers({
    accountIssues,
    app,
    login,
    profile,
    profileRepositories,
    profileOrganizations,
    navigation,
    repository
})
