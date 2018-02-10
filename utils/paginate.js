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
