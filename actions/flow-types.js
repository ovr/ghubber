// @flow

import type { AccountFeedState } from 'reducers/account-feed';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AccountPullRequestsState } from 'reducers/account-pull-requests';
import type { AppState, PlainAuthorizationEntity, OAuthAuthorizationEntity } from 'reducers/app';
import type { LoginState } from 'reducers/login';
import type { NavigationState } from 'reducers/navigation';
import type { ProfileState } from 'reducers/profile';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';
import type { ProfileOrganizationsState } from 'reducers/profile-organizations';
import type { RepositoryState } from 'reducers/repository';

export var SENTRY_ENABLED: boolean;
export var GHUBBER_OAUTH: string;

export type BaseAction<T> = {|
    type: T
|}

export type ActionWithPayload<T, P> = {|
    type: T,
    payload: P,
|}

export type ActionWithError<T, E> = {|
    type: T,
    error: E
|}


export type Action =
      BaseAction<"SIDEMENU_OPEN">
    | BaseAction<"SIDEMENU_CLOSE">
    //
    | ActionWithPayload<"APP_PROFILE_SUCCESS", any>
    | ActionWithPayload<"APP_ORGANIZATIONS_SUCCESS", any>
    | ActionWithPayload<"APP_LOGOUT_SUCCESS", any>
    //
    | BaseAction<"LOGIN_REQUEST">
    | BaseAction<"LOGIN_REQUEST_2FA_REQUIRED">
    | ActionWithPayload<"LOGIN_REQUEST_SUCCESS", any>
    | ActionWithError<"LOGIN_REQUEST_FAIL", any>
    //
    | BaseAction<"ACCOUNT_FEED_REQUEST">
    | ActionWithPayload<"ACCOUNT_FEED_SUCCESS", any>
    | ActionWithError<"ACCOUNT_FEED_FAIL", any>
    //
    | BaseAction<"ACCOUNT_FEED_REQUEST">
    | ActionWithPayload<"ACCOUNT_FEED_SUCCESS", any>
    | ActionWithError<"ACCOUNT_FEED_FAIL", any>
    //
    | BaseAction<"ACCOUNT_FEED_INFINITY_REQUEST">
    | ActionWithPayload<"ACCOUNT_FEED_INFINITY_SUCCESS", any>
    | ActionWithError<"ACCOUNT_FEED_INFINITY_FAIL", any>
    //
    | BaseAction<"ACCOUNT_ISSUES_REQUEST">
    | ActionWithPayload<"ACCOUNT_ISSUES_SUCCESS", any>
    | ActionWithError<"ACCOUNT_ISSUES_FAIL", any>
    //
    | BaseAction<"ACCOUNT_ISSUES_MORE_REQUEST">
    | ActionWithPayload<"ACCOUNT_ISSUES_MORE_SUCCESS", any>
    | ActionWithError<"ACCOUNT_ISSUES_MORE_FAIL", any>
    //
    | BaseAction<"ACCOUNT_PULL_REQUESTS_REQUEST">
    | ActionWithPayload<"ACCOUNT_PULL_REQUESTS_SUCCESS", any>
    | ActionWithError<"ACCOUNT_PULL_REQUESTS_FAIL", any>
    //
    | BaseAction<"ACCOUNT_PULL_REQUESTS_MORE_REQUEST">
    | ActionWithPayload<"ACCOUNT_PULL_REQUESTS_MORE_SUCCESS", any>
    | ActionWithError<"ACCOUNT_PULL_REQUESTS_MORE_FAIL", any>
    //
    | BaseAction<"PROFILE_REQUEST">
    | ActionWithPayload<"PROFILE_REQUEST_FAIL", any>
    | ActionWithError<"PROFILE_REQUEST_SUCCESS", any>
    //
    | BaseAction<"PROFILE_ORGANIZATIONS_REQUEST">
    | ActionWithPayload<"PROFILE_ORGANIZATIONS_REQUEST_FAIL", any>
    | ActionWithError<"PROFILE_ORGANIZATIONS_REQUEST_SUCCESS", any>
    //
    | BaseAction<"PROFILE_REPOSITORIES_REQUEST">
    | ActionWithPayload<"PROFILE_REPOSITORIES_REQUEST_FAIL", any>
    | ActionWithError<"PROFILE_REPOSITORIES_REQUEST_SUCCESS", any>
    //
    | BaseAction<"PROFILE_REPOSITORIES_MORE_REQUEST">
    | ActionWithPayload<"PROFILE_REPOSITORIES_MORE_REQUEST_FAIL", any>
    | ActionWithError<"PROFILE_REPOSITORIES_MORE_REQUEST_SUCCESS", any>
    //
    | BaseAction<"REPOSITORY_REQUEST">
    | ActionWithPayload<"REPOSITORY_REQUEST_SUCCESS", any>
    | ActionWithError<"REPOSITORY_REQUEST_FAIL", any>
    //
    | ActionWithError<"LOGIN_REQUEST_FAIL", any>
    //
    | ActionWithPayload<"LOGIN_REQUEST_SUCCESS", PlainAuthorizationEntity | OAuthAuthorizationEntity>
;

export type PromiseAction = Promise<Action>;

export type State = {|
    accountFeed: AccountFeedState,
    accountIssues: AccountIssuesState,
    accountPullRequests: AccountPullRequestsState,
    app: AppState,
    login: LoginState,
    navigation: NavigationState,
    profile: ProfileState,
    profileOrganizations: ProfileRepositoriesState,
    profileRepositories: ProfileOrganizationsState,
    repository: RepositoryState
|};

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
