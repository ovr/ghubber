// @flow

export async function paginate(
    req: (page: number) => any,
    limit: number
): Promise<any> {
    let result: Array<any> = [];

    async function next(page: number): Promise<any> {
        try {
            const response = await req(page);

            result = result.concat(response);

            // Skip unneeded fetch
            if (response && response.length >= limit - 2) {
                return await next(page + 1);
            }

            return result;
        } catch (e) {
            // @todo retry query?
            console.warn(e);
        }
    }

    return await next(1);
}

export async function paginateBySlice(
    req: (page: number) => any,
    limit: number,
    cb: (result: Array<any>, page: number) => void,
): Promise<any> {
    async function next(page: number): Promise<any> {
        try {
            const response = await req(page);

            cb(response, page);

            // Skip unneeded fetch
            if (response && response.length >= limit - 2) {
                await next(page + 1);
            }
        } catch (e) {
            // @todo retry query?
            console.warn(e);
        }
    }

    return await next(1);
}
