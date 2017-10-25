// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow


import { executeGraphQL } from 'github-flow-js';
import { PROFILE_REQUEST } from 'constants';
import { makeThunk } from 'utils/action-helper';

const getProfileQL = `
query($login: String!) {
    user(login: $login) {
        id,
        name,
        avatarUrl,
        email,
        bio,
        location,
        company,
        websiteUrl,
        login,
        viewerIsFollowing,
        viewerCanFollow,
        gists {
            totalCount
        },
        repositories {
            totalCount
        },
        following {
            totalCount
        },
        followers {
            totalCount
        }
    }
}
`;

export function fetchProfile(login: string): ThunkAction {
    return makeThunk(
        async () => {
            const result = await executeGraphQL(getProfileQL, { login });
            return result.user;
        },
        PROFILE_REQUEST
    );
}
