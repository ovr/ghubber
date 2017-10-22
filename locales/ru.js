export default {
    AccountIssues: {
        Title: 'Задачи',
        EmptyResult: 'У вас нет задач ;)',
        Filter: {
            Created: 'По дате создания',
            Assigned: 'Назначенные мне',
            Mentioned: 'Упомянутые',
        }
    },
    AccountNotifications: {
        Title: 'Нотификации',
        EmptyResult: 'Нет нотификаций ;)',
        Filter: {
            Unread: 'Непрочитанные',
            Participating: 'Участие',
            All: 'Все'
        }
    },
    AccountPullRequests: {
        Title: 'Pull-запросы',
        EmptyResult: 'Нет pull-запросов ;)',
        Filter: {
            Created: 'По дате создания',
            Assigned: 'Назначенные мне',
            Mentioned: 'Упомянутые',
            ReviewRequested: 'Требуют просмотра',
        }
    },
    ErrorView: {
        Title: 'Извините, возникла ошибка с кодом {{errorCode}} в ответе :(',
        RefreshButton: 'Обновить ;)',
    },
    EventRow: {
        At: 'на',
        To: 'в',
        In: 'в',
        Issue: 'задачу',
        PR: 'pull-запрос',
        Release: 'релиз',
        HiddenCommits: '{{commits}} было скрыто',
        Commits: {
            one: '1 коммит',
            few: '{{count}} коммита',
            many: '{{count}} коммитов',
        },
        CommitSummary: {
            Text: '{{commits}} с {{additions}} и {{deletions}}',
            Additions: {
                one: '1 добавлением',
                few: '{{count}} добавлениями',
                many: '{{count}} добавлениями',
            },
            Deletions: {
                one: '1 удалением',
                few: '{{count}} удалениями',
                many: '{{count}} удалениями',
            },
        },
        TypeEventNotSupported: 'Данный тип события ({{eventType}}) не поддерживается в этой версии',
        UnexpectedException: 'Неожиданное исключение в типе события ({{eventType}}) :(',
        Actions: {
            GullumEdit: 'отредактировал wiki страницу',
            CommentedPR: 'прокомментировал pull-запрос',
            CommentedCommit: 'прокомментировал коммит',
            Closed: 'закрыл',
            Merged: 'принял',
            Forked: 'клонировал',
            CommentedIssue: 'прокомментировал задачу',
            Created: 'создал',
            PushedTo: 'отправил в',
            Starred: 'отметил',
        },
        GullumActions: {
            edited: 'Отредактировал'
        },
        IssuesActions: {
            assigned: 'назначил',
            unassigned: 'разначил',
            labeled: 'поставил метку',
            unlabeled: 'убрал метку',
            opened: 'открыл',
            edited: 'отредактировал',
            milestoned: 'добавил в план',
            demilestoned: 'убрал из плана',
            closed: 'закрыл',
            reopened: 'переоткрыл',
        },
        ReleaseActions: {
            published: 'опубликовал',
        },
        PullRequestActions: {
            assigned: 'назначил',
            unassigned: 'разначил',
            review_requested: 'запросил ревью',
            review_request_removed: 'удалил запрос ревью',
            labeled: 'поставил метку',
            unlabeled: 'убрал метку',
            opened: 'открыл',
            edited: 'отредактировал',
            closed: 'закрыл',
            reopened: 'переоткрыл',
        },
        CreateTypes: {
            repository: 'репозиторий',
            branch: 'ветку',
            tag: 'тег',
        },
        DeleteTypes: {
            branch: 'ветку',
            tag: 'тег',
        },
    },
    ModalPicker: {
        cancelButtonName: 'отмена',
    },
};
