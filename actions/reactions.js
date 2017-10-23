// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { deleteReaction as apiDeleteReaction } from 'github-flow-js';
import { captureException } from 'utils/errors';

export function deleteReaction(id: string): ThunkAction {
    return async () => {
        try {
            await apiDeleteReaction(id);
        } catch (e) {
            captureException(e);
        }
    };
}
