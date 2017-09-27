// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

export function addModal(element: React$Element<any>): Action {
    return {
        type: 'MODAL_ADD',
        payload: element
    };
}

export function closeModal(): Action {
    return {
        type: 'MODAL_CLOSE'
    };
}
