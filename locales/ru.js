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
        PushedTo: 'отправил в',
        At: 'в',
        Issue: 'задача',
        Release: 'релиз',
        Created: 'создал',
        CommentedPR: 'прокомментировал pull-запрос',
        Closed: 'закрыл',
        Merged: 'слил',
        PR: 'pull-запрос',
        CommitSummary: '{{commits}} коммити с\u{0009}{{additions}} добавлениями и\u{0009}{{deletions}} удалениями',
        CommentedIssue: 'прокомментировал задачу',
        TypeEventNotSupported: 'Данный тип события ({{eventType}}) не поддерживается в этой версии',
        UnexpectedException: 'Неожиданное исключение в типе события ({{eventType}}) :(',
    }
}
