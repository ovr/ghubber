// @flow

import type { AccountFeedState } from 'reducers/account-feed';
import type { AccountIssuesState } from 'reducers/account-issues';
import type { AppState } from 'reducers/app';
import type { LoginState } from 'reducers/login';
import type { NavigationState } from 'reducers/navigation';
import type { ProfileState } from 'reducers/profile';
import type { ProfileRepositoriesState } from 'reducers/profile-repositories';
import type { ProfileOrganizationsState } from 'reducers/profile-organizations';
import type { RepositoryState } from 'reducers/repository';

export type ActionWithPayload<P> = {
    type: string,
    payload: P,
}

export type ActionWithError<E> = {
    type: string,
    error: E
}

export type Action = ActionWithPayload<any> | ActionWithError<any>;
export type PromiseAction = Promise<Action>;

export type State = {|
    accountFeed: AccountFeedState,
    accountIssues: AccountIssuesState,
    app: AppState,
    login: LoginState,
    login: NavigationState,
    profile: ProfileState,
    profileOrganizations: ProfileRepositoriesState,
    profileRepositories: ProfileOrganizationsState,
    repository: RepositoryState,
|};

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
