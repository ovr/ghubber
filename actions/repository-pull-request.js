// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { executeGraphQL } from 'github-flow-js';
import { REPOSITORY_PR_REQUEST } from 'constants/index';
import { makeThunk } from 'utils/action-helper';

const getRepositoryPullRequestQL = `
query($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
        pullRequest(number: $number) {
            title,
            body,
            state,
            reactionGroups {
                content,
                users {
                    totalCount
                }
            },
            author {
                login,
                avatarUrl
            },
      		commits(first: 100) {
            	nodes {
                commit {
                  message,
                  id,
                  author {
                    avatarUrl,
                  }
                  status {
				    state
                  }
                }
              }  
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

export function fetchPullRequest(owner: string, name: string, number: number): ThunkAction {
    return makeThunk(
        async () => {
            const result = await executeGraphQL(getRepositoryPullRequestQL, { owner, name, number });
            return result.repository.pullRequest;
        },
        REPOSITORY_PR_REQUEST
    );
}
