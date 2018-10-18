export default {
    CommitScreen: {
        Error: {
            NoCommitter: 'Imposible abrir el perfil, el autor no es un usuario de Github'
        }
    },
    AccountIssues: {
        Title: 'Problemas',
        EmptyResult: 'Usted no tiene ningún problema ;)',
        Filter: {
            Created: 'Creado',
            Assigned: 'Asignado',
            Mentioned: 'Mencionado',
        }
    },
    AccountNotifications: {
        Title: 'Notificaciones',
        EmptyResult: 'Usted no tiene ninguna notificación ;)',
        Filter: {
            Unread: 'Sin leer',
            Participating: 'Participante',
            All: 'Todas'
        }
    },
    AccountPullRequests: {
        Title: 'Pull Requests',
        EmptyResult: 'Usted no tiene ninguna pull request ;)',
        Filter: {
            Created: 'Creada',
            Assigned: 'Asignada',
            Mentioned: 'Mencionada',
            ReviewRequested: 'Peticiones de revisión',
        }
    },
    ErrorView: {
        Title: 'Disculpe, pero estamos teniendo {{errorCode}} en la respuesta :(',
        RefreshButton: 'Actualizar ;)',
    },
    EventRow: {
        At: 'a las',
        To: 'a',
        Issue: 'problema',
        PR: 'pull request',
        Release: 'versión',
        HiddenCommits: '{{commits}} estaba/n oculto/s',
        Commits: {
            one: '1 commit',
            other: '{{count}} commits',
        },
        CommitSummary: {
            Text: '{{commits}} con {{additions}} y {{deletions}}',
            Additions: {
                one: '1 inserción',
                other: '{{count}} inserciones',
            },
            Deletions: {
                one: '1 borrado',
                other: '{{count}} borrados',
            },
        },
        TypeEventNotSupported: 'Esta versión no acepta este tipo de evento ({{eventType}})',
        UnexpectedException: 'Excepción inesperada con el tipo de evento ({{eventType}}) :(',
        Actions: {
            CommentedPR: 'comentó una pull request',
            CommentedCommit: 'comentó un commit',
            Closed: 'cerró',
            Merged: 'fusionó',
            Forked: 'bifurcó',
            CommentedIssue: 'comentó un problema',
            Created: 'creó',
            PushedTo: 'hizo push a',
            Starred: 'marcó con una estrella',
        },
        IssuesActions: {
            assigned: 'asignó',
            unassigned: 'sin asignar',
            labeled: 'etiquetó',
            unlabeled: 'desetiquetó',
            opened: 'abrió',
            edited: 'editó',
            milestoned: 'puso un hito',
            demilestoned: 'quitó un hito',
            closed: 'cerró',
            reopened: 'reabrió'
        },
        ReleaseActions: {
            published: 'publicó',
        },
        PullRequestActions: {
            assigned: 'asignó',
            unassigned: 'desasignó',
            review_requested: 'solicitó revisión',
            review_request_removed: 'eliminó solicitud de revisión',
            labeled: 'etiquetó',
            unlabeled: 'desetiquetó',
            opened: 'abrió',
            edited: 'editó',
            closed: 'cerró',
            reopened: 'reabrió',
        },
        CreateTypes: {
            repository: 'repositorio',
            branch: 'rama',
            tag: 'etiqueta',
        },
        DeleteTypes: {
            branch: 'rama',
            tag: 'etiqueta',
        },
    },
    ModalPicker: {
        cancelButtonName: 'cancelar',
    },
};
