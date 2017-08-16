// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as sideMenu } from './side-menu';
import { default as login } from './login';
import { default as profile } from './profile';
import { default as accountIssues } from './account-issues';
import { default as accountPullRequests } from './account-pull-requests';
import { default as accountFeed } from './account-feed';
import { default as profileRepositories } from './profile-repositories';
import { default as profileOrganizations } from './profile-organizations';
import { default as navigation } from './navigation';
import { default as repository } from './repository';
import { default as repositoryCommit } from './repository-commit';
import { default as repositoryIssue } from './repository-issue';
import { default as repositoryPullRequest } from './repository-pull-request';

export default combineReducers({
    accountFeed,
    accountIssues,
    accountPullRequests,
    app,
    sideMenu,
    login,
    profile,
    profileRepositories,
    profileOrganizations,
    navigation,
    repository,
    repositoryCommit,
    repositoryIssue,
    repositoryPullRequest
});
