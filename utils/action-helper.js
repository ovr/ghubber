// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

/**
 * ST is success type for Promise | Dispatch success
 */

export function makeThunk<S>(cb: () => Promise<S>, type: ActionType): ThunkAction {
    return async dispatch => {
        dispatch({
            type
        });

        try {
            const commit: S = await cb();

            dispatch({
                type: `${type}_SUCCESS`,
                payload: commit
            });
        } catch (e) {
            dispatch({
                type: `${type}_FAIL`,
                error: e
            });

            console.warn(e);
        }
    }
}
