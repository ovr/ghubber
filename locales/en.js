export default {
    HomeHeaderRight: {
        IssuesTitle:  'Issues'
    },
    AccountIssues: {
        Title: 'Issues',
        Error: 'Oops! Error...',
        EmptyResult: 'You don\'t have any issues ;)',
        Filter: {
            Created: 'Created',
            Assigned: 'Assigned',
            Mentioned: 'Mentioned',
        }
    },
    AccountPullRequests: {
        Title: 'Pull Requests',
        Error: 'Oops! Error...',
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
        ButtonRefresh: 'Refresh ;)',
    },
    EventRow: {
        PushedTo: 'pushed to',
        At: 'at',
        Issue: 'issue',
        Release: 'release',
        CommentedPR: 'commented on pull request',
        Closed: 'closed',
        Merged: 'merged',
        PR: 'pull request',
        CommitSummary: '{{commits}} commit(s) with\u{0009}{{additions}} additions and\u{0009}{{deletions}} deletions',
        CommentedIssue: 'commented on issue',
        Created: 'created',
        TypeEventNotSupported: 'This type of event ({{eventType}}) does not supported inside this version',
        UnexpectedException: 'Unexpected exception with Event\'s type ({{eventType}}) :(',
    }
}
