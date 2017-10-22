// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { executeGraphQL } from 'github-flow-js';
import { REPOSITORY_ISSUE_REQUEST } from 'constants';
import { makeThunk } from 'utils/action-helper';

const getRepositoryIssueQL = `
query($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
        issue(number: $number) {
            title,
            body,
            state,
            reactionGroups {
                content,
                viewerHasReacted,
                users {
                    totalCount
                }
            },
            author {
                login,
                avatarUrl
            },
            comments(first: 30) {
                totalCount,
                nodes {
                    id,
                    body,
                    createdAt,
                    viewerCanDelete,
                    viewerCanReact,
                    author {
                        login,
                        avatarUrl
                    }
                }
            }
        }
    }
}
`;

export function fetchIssue(owner: string, name: string, number: number): ThunkAction {
    return makeThunk(
        async () => {
            const result = await executeGraphQL(getRepositoryIssueQL, { owner, name, number });
            return result.repository.issue;
        },
        REPOSITORY_ISSUE_REQUEST
    );
}
