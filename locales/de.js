export default {
    CommitScreen: {
        Error: {
            NoCommitter: 'Das Profil konnte nicht geladen werden, da der Commit-Ersteller kein GitHub-Nutzer ist'
        }
    },
    AccountIssues: {
        Title: 'Issues',
        EmptyResult: 'Es gibt keine Issues ;)',
        Filter: {
            Created: 'Erstellt',
            Assigned: 'Zugewiesen',
            Mentioned: 'Genannt',
        }
    },
    AccountNotifications: {
        Title: 'Benachrichtigungen',
        EmptyResult: 'Du hast keine Benachrichtigungen ;)',
        Filter: {
            Unread: 'Ungelesen',
            Participating: 'Teilnehmend',
            All: 'Alle'
        }
    },
    AccountPullRequests: {
        Title: 'Pull Requests',
        EmptyResult: 'Du hast keine Pull Requests ;)',
        Filter: {
            Created: 'Erstellt',
            Assigned: 'Zugewiesen',
            Mentioned: 'Genannt',
            ReviewRequested: 'Überprüfungsanfrage',
        }
    },
    ErrorView: {
        Title: 'Tut uns Leid, bei der Anfrage ist {{errorCode}} aufgetreten :(',
        RefreshButton: 'Neu laden ;)',
    },
    EventRow: {
        At: 'An',
        To: 'an',
        In: 'in',
        Issue: 'Issue',
        PR: 'Pull Request',
        Release: 'Release',
        HiddenCommits: '{{commits}} sind versteckt',
        Commits: {
            one: '1 Commit',
            other: '{{count}} Commits',
        },
        CommitSummary: {
            Text: '{{commits}} mit {{additions}} und {{deletions}}',
            Additions: {
                one: '1 Einfügung',
                other: '{{count}} Einfügungen',
            },
            Deletions: {
                one: '1 Löschung',
                other: '{{count}} Löschungen',
            },
        },
        TypeEventNotSupported: 'Der Eventtyp ({{eventType}}) wird in dieser Version nicht unterstützt.',
        UnexpectedException: 'Unbehandelte Ausnahme mit Eventtyp ({{eventType}}) :(',
        Actions: {
            GullumEdit: 'hat eine Wiki-Seite bearbeitet',
            CommentedPR: 'hat einen Pull Request kommentiert',
            CommentedCommit: 'hat einen Commit kommentiert',
            Closed: 'geschlossen',
            Merged: 'gemerged',
            Forked: 'geforked',
            CommentedIssue: 'hat auf ein Issue geantwortet',
            Created: 'erstellt',
            PushedTo: 'gepushed',
            Starred: 'favorisiert',
        },
        GullumActions: {
            edited: 'Bearbeitet'
        },
        IssuesActions: {
            assigned: 'zugewiesen',
            unassigned: 'nicht zugewiesen',
            labeled: 'mit Label',
            unlabeled: 'ohne Label',
            opened: 'geöffnet',
            edited: 'bearbeitet',
            milestoned: 'Meilenstein gesetzt',
            demilestoned: 'Meilenstein entfernt',
            closed: 'geschlossen',
            reopened: 'wieder geöffnet',
        },
        ReleaseActions: {
            published: 'veröffentlicht',
        },
        PullRequestActions: {
            assigned: 'zugewiesen',
            unassigned: 'nicht zugewiesen',
            review_requested: 'Überprüfungs angefragt',
            review_request_removed: 'Überprüfungsanfrage enfernt',
            labeled: 'mit Label',
            unlabeled: 'ohne Label',
            opened: 'geöffnet',
            edited: 'bearbeitet',
            closed: 'geschlossen',
            reopened: 'wieder geöffnet',
        },
        CreateTypes: {
            repository: 'Repository',
            branch: 'Branch',
            tag: 'Tag',
        },
        DeleteTypes: {
            branch: 'Branch',
            tag: 'Tag',
        },
    },
    ModalPicker: {
        cancelButtonName: 'Abbrechen',
    },
};
