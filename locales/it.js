export default {
    CommitScreen: {
        Error: {
            NoCommitter: 'Impossibile aprire il profile, l\'autore non è un utente di Github'
        }
    },
    AccountIssues: {
        Title: 'Issues',
        EmptyResult: 'Non hai nessun issue ;)',
        Filter: {
            Created: 'Creato',
            Assigned: 'Assegnato',
            Mentioned: 'Menzionato',
        }
    },
    AccountNotifications: {
        Title: 'Notifiche',
        EmptyResult: 'Non hai nessuna notifica ;)',
        Filter: {
            Unread: 'Non letta',
            Participating: 'Partecipando',
            All: 'Tutte'
        }
    },
    AccountPullRequests: {
        Title: 'Pull Requests',
        EmptyResult: 'Non hai nessuna pull requests ;)',
        Filter: {
            Created: 'Creata',
            Assigned: 'Assegnata',
            Mentioned: 'Menzionato',
            ReviewRequested: 'Review  requests',
        }
    },
    ErrorView: {
        Title: 'Spiacenti, ma stiamo ricevendo {{errorCode}} in risposta :(',
        RefreshButton: 'Ricarica ;)',
    },
    EventRow: {
        At: 'in',
        To: 'in',
        In: 'in',
        Issue: 'issue',
        PR: 'pull request',
        Release: 'release',
        HiddenCommits: '{{commits}} era nascosto',
        Commits: {
            one: '1 commit',
            other: '{{count}} commits',
        },
        CommitSummary: {
            Text: '{{commits}} con {{additions}} e {{deletions}}',
            Additions: {
                one: '1 aggiunta',
                other: '{{count}} aggiunte',
            },
            Deletions: {
                one: '1 cancellazione',
                other: '{{count}} cancellazioni',
            },
        },
        TypeEventNotSupported: 'Questo tipo di evento ({{eventType}}) non è supportato in questa versione',
        UnexpectedException: 'Unexpected exception con tipo evento ({{eventType}}) :(',
        Actions: {
            GullumEdit: 'ha modificato la pagina wiki',
            CommentedPR: 'ha commentato la pull request',
            CommentedCommit: 'ha commentato il commit',
            Closed: 'chiuso',
            Merged: 'unito',
            Forked: 'forkato',
            CommentedIssue: 'commentato l\'issue',
            Created: 'creato',
            PushedTo: 'pushato in',
            Starred: 'salvato',
        },
        GullumActions: {
            edited: 'Modificato'
        },
        IssuesActions: {
            assigned: 'assegnato',
            unassigned: 'non assegnato',
            labeled: 'con etichetta',
            unlabeled: 'senza etichetta',
            opened: 'aperto',
            edited: 'modificato',
            milestoned: 'con milestone',
            demilestoned: 'senza milestone',
            closed: 'chiuso',
            reopened: 'riaperto'
        },
        ReleaseActions: {
            published: 'pubblicato',
        },
        PullRequestActions: {
            assigned: 'assegnata',
            unassigned: 'non assegnata',
            review_requested: 'richiesta review',
            review_request_removed: 'richieste review rimossa',
            labeled: 'con etichetta',
            unlabeled: 'senza etichetta',
            opened: 'aperta',
            edited: 'modificata',
            closed: 'chiusa',
            reopened: 'riaperta',
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
        cancelButtonName: 'annulla',
    },
};
