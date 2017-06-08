// @flow

import { last } from 'lodash';

/**
 * Why is it needed?
 *
 * Let imagine:
 *
 * 1. You request api.github.com/feed?page=1&per_page=30, ids: [30000, 40000]
 * 2. w8th sometime for new data
 * 3. You request api.github.com/feed?page=1&per_page=30, but you see again item with 30000 :(
 *
 * Because pagination based on top of page parameter, is a bad idea for fast updated lists
 */
export function filterConcat<T: Object>(current: Array<T>, next: Array<T>): Array<T> {
    if (current.length === 0) {
        return next;
    }

    if (next.length === 0) {
        return current;
    }

    // @todo Think a little bit more about this idea
    // const lastCurrentIndex = last(current).id;
    // const splitIndex = next.findIndex((item) => item.id === lastCurrentIndex);
    //
    // if (splitIndex === -1) {
    //     return current.concat(next);
    // }
    //
    // // Remove some part of repeated elements
    // next.splice(splitIndex)

    next = next.filter(
        (entity) => {
            return current.findIndex((item) => item.id === entity.id) === -1
        }
    )

    return current.concat(next);
}
