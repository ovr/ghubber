export default {
    AccountIssues: {
        Title: 'Bugy',
        EmptyResult: 'Žiadne bugy ;)',
        Filter: {
            Created: 'Vytvorené',
            Assigned: 'Pridelené',
            Mentioned: 'Zmienené'
        }
    },
    AccountNotifications: {
        Title: 'Notifikácie',
        EmptyResult: 'žiadne notifikácie ;)',
        Filter: {
            Unread: 'Neprečítané',
            Participating: 'Zúčastnený',
            All: 'Všetky'
        }
    },
    AccountPullRequests: {
        Title: 'Požiadavky na pull',
        EmptyResult: 'Žiadne požiadavky na pull ;)',
        Filter: {
            Created: 'Vytvorené',
            Assigned: 'Pridelené',
            Mentioned: 'Zmienené',
            ReviewRequested: 'Posúdiť požiadavky'
        }
    },
    ErrorView: {
        Title: 'Ospravedlňujeme sa, ale máme {{errorCode}} na túto požiadavku :(',
        RefreshButton: 'Obnoviť ;)'
    },
    EventRow: {
        At: 'na',
        To: 'ku',
        Issue: 'bugy',
        PR: 'požiadavka na pull',
        Release: 'vydanie',
        HiddenCommits: '{{commits}} boli skryté',
        Commits: {
            one: '1 commit',
            other: '{{count}} commity'
        },
        CommitSummary: {
            Text: '{{commits}} s {{additions}} a {{deletions}}',
            Additions: {
                one: '1 prídavok',
                other: '{{count}} prídavky'
            },
            Deletions: {
                one: '1 vymazanie',
                other: '{{count}} vymazania'
            }
        },
        TypeEventNotSupported: 'Typ eventu ({{eventType}}) nie je podporovaný v tejto verzii',
        UnexpectedException: 'Neočákavaná chyba s typom eventu: ({{eventType}}) :(',
        Actions: {
            CommentedPR: 'komentoval na požiadavku na pull',
            CommentedCommit: 'komentoval na commit',
            Closed: 'ukončil',
            Merged: 'zlúčil',
            Forked: 'rozvetvil',
            CommentedIssue: 'komentoval na bug',
            Created: 'vytvoril',
            PushedTo: 'odoslal do',
            Starred: 'lajkol'
        },
        IssuesActions: {
            assigned: 'pridelil',
            unassigned: 'odpridelil',
            labeled: 'označil',
            unlabeled: 'odoznačil',
            opened: 'otvoril',
            edited: 'upravil',
            milestoned: 'pridal míľnik',
            demilestoned: 'odstránil míľnik',
            closed: 'zatvoril',
            reopened: 'znovuotvoril'
        },
        ReleaseActions: {
            published: 'publikoval'
        },
        PullRequestActions: {
            assigned: 'pridelil',
            unassigned: 'odpridelil',
            review_requested: 'vyžiadal posudok',
            review_request_removed: 'odstránil požiadavku na posudok',
            labeled: 'označil',
            unlabeled: 'odoznačil',
            opened: 'otvoril',
            edited: 'upravil',
            closed: 'zatvoril',
            reopened: 'znovuotvoril'
        },
        CreateTypes: {
            repository: 'repozitár',
            branch: 'branch',
            tag: 'značka'
        },
        DeleteTypes: {
            branch: 'branch',
            tag: 'značka'
        }
    },
    ModalPicker: {
        cancelButtonName: 'zrušiť'
    }
};