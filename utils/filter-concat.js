// @flow

import { last } from 'lodash';

/**
 * Why is it needed?
 *
 * Let imagine:
 *
 * 1. You request api.github.com/feed?page=1&per_page=30, ids: [30000, 4000]
 * 2. w8th sometime for new data
 * 3. You request api.github.com/feed?page=1&per_page=30, but you see again item with 30000 :(
 * 4. Because page pagination is a bad idea for fast updated lists
 *
 */
export function filterConcat<T: Object>(current: Array<T>, next: Array<T>): Array<T> {
    if (current.length === 0) {
        return next;
    }

    if (next.length === 0) {
        return current;
    }

    const lastCurrentIndex = last(current).id;
    const splitIndex = next.findIndex((item) => item.id === lastCurrentIndex);

    if (splitIndex === -1) {
        return current.concat(next);
    }

    return current.concat(next.splice(splitIndex));
}
