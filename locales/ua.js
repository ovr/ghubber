export default {
  CommitScreen: {
      Error: {
          NoCommitter: 'Неможливо відкрити профіль. Автор коміту не зареєстрований на GitHub'
      }
  },
  AccountIssues: {
      Title: 'Проблеми',
      EmptyResult: 'Поки все без проблем ;)',
      Filter: {
          Created: 'Створено',
          Assigned: 'Призначено відповідальним',
          Mentioned: 'Згадано',
      }
  },
  AccountNotifications: {
      Title: 'Сповіщення',
      EmptyResult: 'У вас немає сповіщень ;)',
      Filter: {
          Unread: 'Непрочитані',
          Participating: 'З моєю участю',
          All: 'Всі'
      }
  },
  AccountPullRequests: {
      Title: 'Pull-запити',
      EmptyResult: 'У вас немає Pull-запитів ;)',
      Filter: {
          Created: 'Створено',
          Assigned: 'Призначено відповідальним',
          Mentioned: 'Згадано',
          ReviewRequested: 'Прохання перевірити',
      }
  },
  ErrorView: {
      Title: 'Помилка {{errorCode}} при відповіді :(',
      RefreshButton: 'Ще раз ;)',
  },
  EventRow: {
      At: 'о',
      To: 'до',
      In: 'в',
      Issue: 'проблема',
      PR: 'pull-запити',
      Release: 'реліз',
      HiddenCommits: '{{commits}} було приховано',
      Commits: {
          one: '1 коміт',
          few: '{{count}} коміти',
          many: '{{count}} комітів',
      },
      CommitSummary: {
          Text: '{{commits}} з {{additions}} та {{deletions}}',
          Additions: {
              one: '1 дописуванням',
              other: '{{count}} дописуваннями',
          },
          Deletions: {
              one: '1 видаленням',
              few: '{{count}} видаленнями',
              many: '{{count}} видаленням',
          },
      },
      TypeEventNotSupported: 'Таки тип події ({{eventType}}) не підтримується у цій версії',
      UnexpectedException: 'Неочікувано помилка з подією типу ({{eventType}}) :(',
      Actions: {
          GullumEdit: 'відредагував wiki-сторінку',
          CommentedPR: 'прокоментував pull-запит',
          CommentedCommit: 'прокоментував коміт',
          Closed: 'закрито',
          Merged: 'злито',
          Forked: 'розгалужено',
          CommentedIssue: 'прокоментував проблему',
          Created: 'створено',
          PushedTo: 'відправив до',
          Starred: 'відмітив зірочкою',
      },
      GullumActions: {
          edited: 'Відредаговано'
      },
      IssuesActions: {
          assigned: 'призначено відповідального',
          unassigned: 'знято відповідального',
          labeled: 'додано мітку',
          unlabeled: 'видалено мітку ',
          opened: 'відкрито',
          edited: 'відредаговано',
          milestoned: 'додано до етапу',
          demilestoned: 'видалено з етапу',
          closed: 'закрито',
          reopened: 'перевідкрито'
      },
      ReleaseActions: {
          published: 'опубліковано',
      },
      PullRequestActions: {
          assigned: 'призначено відповідального',
          unassigned: 'знято відповідальног',
          review_requested: 'попросив перевірити',
          review_request_removed: 'каже, що перевірка не потрібна',
          labeled: 'поставив мітку',
          unlabeled: 'забрав мітку',
          opened: 'відкрито',
          edited: 'відредаговано',
          closed: 'закрито',
          reopened: 'перевідкрито',
      },
      CreateTypes: {
          repository: 'репозиторій',
          branch: 'гілка',
          tag: 'тег',
      },
      DeleteTypes: {
          branch: 'гілка',
          tag: 'тег',
      },
  },
  ModalPicker: {
      cancelButtonName: 'відмінити',
  },
};
