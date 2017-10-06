export default {
  AccountIssues: {
      Title: 'Problemas',
      EmptyResult: 'Você não tem nenhum problema ;)',
      Filter: {
          Created: 'Criado',
          Assigned: 'Atribuído',
          Mentioned: 'Mencionado',
      }
  },
  AccountNotifications: {
      Title: 'Notificações',
      EmptyResult: 'Você não tem nenhuma notificação ;)',
      Filter: {
          Unread: 'Não lido',
          Participating: 'Participando',
          All: 'Todos'
      }
  },
  AccountPullRequests: {
      Title: 'Pedidos de envio',
      EmptyResult: 'Você não possui pedidos de envio ;)',
      Filter: {
          Created: 'Criado',
          Assigned: 'Atribuído',
          Mentioned: 'Mencionado',
          ReviewRequested: 'Revisar requisições',
      }
  },
  ErrorView: {
      Title: 'Desculpe, mas estamos tendo {{errorCode}} na resposta :(',
      RefreshButton: 'Atualizar ;)',
  },
  EventRow: {
      At: 'de',
      To: 'para',
      Issue: 'problema',
      PR: 'pedido de envio',
      Release: 'lançamento',
      HiddenCommits: '{{commits}} estava escondido',
      Commits: {
          one: '1 commit',
          other: '{{count}} commits',
      },
      CommitSummary: {
          Text: '{{commits}} com {{additions}} e {{deletions}}',
          Additions: {
              one: '1 adição',
              other: '{{count}} adições',
          },
          Deletions: {
              one: '1 excluído',
              other: '{{count}} excluídos',
          },
      },
      TypeEventNotSupported: 'Este tipo de evento ({{eventType}}) não é suportado nesta versão',
      UnexpectedException: 'Exceção inesperada com o tipo de evento ({{eventType}}) :(',
      Actions: {
          CommentedPR: 'comentou sobre o pedido de envio',
          CommentedCommit: 'comentou sobre o commit',
          Closed: 'fechado',
          Merged: 'mesclado',
          Forked: 'birfurcado',
          CommentedIssue: 'comentado sobre o problema',
          Created: 'criado',
          PushedTo: 'enviado para',
          Starred: 'favoritado',
      },
      IssuesActions: {
          assigned: 'atribuído',
          unassigned: 'não atribuído',
          labeled: 'rotulado',
          unlabeled: 'não rotulado',
          opened: 'aberto',
          edited: 'editado',
          milestoned: 'marcado',
          demilestoned: 'desmarcado',
          closed: 'fechado',
          reopened: 'reaberto'
      },
      ReleaseActions: {
          published: 'publicado',
      },
      PullRequestActions: {
          assigned: 'atribuído',
          unassigned: 'não atribuído',
          review_requested: 'revisão_solicitada',
          review_request_removed: 'revisão_solicitada_removida',
          labeled: 'rotulado',
          unlabeled: 'não rotulado',
          opened: 'aberto',
          edited: 'editado',
          closed: 'fechado',
          reopened: 'reaberto',
      },
      CreateTypes: {
          repository: 'repositório',
          branch: 'ramo',
          tag: 'etiqueta',
      },
      DeleteTypes: {
          branch: 'ramo',
          tag: 'etiqueta',
      },
  },
  ModalPicker: {
      cancelButtonName: 'cancelar',
  },
};
