export default {
    HomeHeaderRight: {
        IssuesTitle:  'Задачи'
    },
    AccountIssues: {
        Title: 'Задачи',
        Error: 'Упс, возникла ошибка!',
        EmptyResult: 'У вас нет задач ;)',
        Filter: {
            Created: 'По дате создания',
            Assigned: 'Назначенные мне',
            Mentioned: 'Упомянутые',
        }
    },
    AccountPullRequests: {
        Title: 'Pull-запросы',
        Error: 'Упс, возникла ошибка!',
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
        ButtonRefresh: 'Обновить ;)',
    },
    EventRow: {
        At: 'на',
        To: 'в',
        Issue: 'задачу',
        PR: 'pull-запрос',
        Release: 'релиз',
        CommitSummary: '{{commits}} коммит(ов) с {{additions}} добавлениями и {{deletions}} удалениями',
        TypeEventNotSupported: 'Данный тип события ({{eventType}}) не поддерживается в этой версии',
        UnexpectedException: 'Неожиданное исключение в типе события ({{eventType}}) :(',
        Actions: {
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
}
