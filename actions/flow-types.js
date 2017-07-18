// @flow

import type { AccountFeedState } from 'reducers/account-feed';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AccountPullRequestsState } from 'reducers/account-pull-requests';
import type { AppState } from 'reducers/app';
import type { LoginState } from 'reducers/login';
import type { NavigationState } from 'reducers/navigation';
import type { ProfileState } from 'reducers/profile';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';
import type { ProfileOrganizationsState } from 'reducers/profile-organizations';
import type { RepositoryState } from 'reducers/repository';

export var SENTRY_ENABLED: boolean;

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
      BaseAction<string>
    | ActionWithPayload<string, any>
    | ActionWithError<string, any>
    | BaseAction<"ACCOUNT_FEED_REQUEST">
    | ActionWithPayload<"ACCOUNT_FEED_SUCCESS", any>
    | ActionWithError<"ACCOUNT_FEED_FAIL", any>;

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
