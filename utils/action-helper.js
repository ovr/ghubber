// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

/**
 * ST is success type for Promise | Dispatch success
 */

export function makeThunk<S>(
    cb: (state: State) => Promise<S>,
    type: ActionType,
    success?: (result: S, dispatch: Dispatch) => any
): ThunkAction {
    return async (dispatch, getState) => {
        dispatch({
            type
        });

        try {
            const payload: S = await cb(getState());

            if (success) {
                success(payload, dispatch);
            } else {
                dispatch({
                    type: `${type}_SUCCESS`,
                    payload
                });
            }
        } catch (e) {
            dispatch({
                type: `${type}_FAIL`,
                error: e
            });

            console.warn(e);
        }
    };
}
