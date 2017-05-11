// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import {
    PROFILE_ORGANIZATIONS_REQUEST,
    PROFILE_ORGANIZATIONS_REQUEST_SUCCESS,
    PROFILE_ORGANIZATIONS_REQUEST_FAIL
} from 'constants';

// import flow types
import type { OrganizationEntity } from 'github-flow-js';

export type ProfileOrganizationsState = {
    loading: boolean,
    error: Object|null,
    organizations: Array<OrganizationEntity>|null
}

const initialState: ProfileOrganizationsState = {
    loading: false,
    error: null,
    organizations: []
}

export default (state: ProfileOrganizationsState = initialState, action: Object): ProfileOrganizationsState => {
    switch (action.type) {
        case PROFILE_ORGANIZATIONS_REQUEST:
            return {
                ...state,
                organizations: null,
                loading: true,
                error: null
            }
        case PROFILE_ORGANIZATIONS_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                organizations: action.payload
            }
        case PROFILE_ORGANIZATIONS_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Unknown error @todo'
            }
        default:
            return state;
    }
}
