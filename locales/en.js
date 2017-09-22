export default {
    AccountIssues: {
        Title: 'Issues',
        EmptyResult: 'You don\'t have any issues ;)',
        Filter: {
            Created: 'Created',
            Assigned: 'Assigned',
            Mentioned: 'Mentioned',
        }
    },
    AccountNotifications: {
        Title: 'Notifications',
        EmptyResult: 'You don\'t have any notifications ;)',
        Filter: {
            Unread: 'Unread',
            Participating: 'Participating',
            All: 'All'
        }
    },
    AccountPullRequests: {
        Title: 'Pull Requests',
        EmptyResult: 'You don\'t have any pull requests ;)',
        Filter: {
            Created: 'Created',
            Assigned: 'Assigned',
            Mentioned: 'Mentioned',
            ReviewRequested: 'Review  requests',
        }
    },
    ErrorView: {
        Title: 'Sorry, but We are having {{errorCode}} on response :(',
        RefreshButton: 'Refresh ;)',
    },
    EventRow: {
        At: 'at',
        To: 'to',
        Issue: 'issue',
        PR: 'pull request',
        Release: 'release',
        HiddenCommits: '{{commits}} was hidden',
        Commits: {
            one: '1 commit',
            other: '{{count}} commits',
        },
        CommitSummary: {
            Text: '{{commits}} with {{additions}} and {{deletions}}',
            Additions: {
                one: '1 addition',
                other: '{{count}} additions',
            },
            Deletions: {
                one: '1 deletion',
                other: '{{count}} deletions',
            },
        },
        TypeEventNotSupported: 'This type of event ({{eventType}}) does not supported inside this version',
        UnexpectedException: 'Unexpected exception with Event\'s type ({{eventType}}) :(',
        Actions: {
            CommentedPR: 'commented on pull request',
            CommentedCommit: 'commented on commit',
            Closed: 'closed',
            Merged: 'merged',
            Forked: 'forked',
            CommentedIssue: 'commented on issue',
            Created: 'created',
            PushedTo: 'pushed to',
            Starred: 'starred',
        },
        IssuesActions: {
            assigned: 'assigned',
            unassigned: 'unassigned',
            labeled: 'labeled',
            unlabeled: 'unlabeled',
            opened: 'opened',
            edited: 'edited',
            milestoned: 'milestoned',
            demilestoned: 'demilestoned',
            closed: 'closed',
            reopened: 'reopened'
        },
        ReleaseActions: {
            published: 'published',
        },
        PullRequestActions: {
            assigned: 'assigned',
            unassigned: 'unassigned',
            review_requested: 'review_requested',
            review_request_removed: 'review_request_removed',
            labeled: 'labeled',
            unlabeled: 'unlabeled',
            opened: 'opened',
            edited: 'edited',
            closed: 'closed',
            reopened: 'reopened',
        },
        CreateTypes: {
            repository: 'repository',
            branch: 'branch',
            tag: 'tag',
        },
        DeleteTypes: {
            branch: 'branch',
            tag: 'tag',
        },
    },
    ModalPicker: {
        cancelButtonName: 'cancel',
    },
};
